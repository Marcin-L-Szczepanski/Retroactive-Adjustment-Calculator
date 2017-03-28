    var monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var payrollDate = new Date();                     // current date = default payroll date
    var payrollMonth = payrollDate.getMonth() + 1;    // current month; January is 0
    var payrollYear = payrollDate.getFullYear();      // current year
    // function showing pyroll date (current date) under "Payroll Month"; invoked when loading page
    $(document).ready(function(){                  
        $("#payrollMonth").val(payrollMonth);
        $("#payrollYear").val(payrollYear);
    });
    // function returning numbers with commas
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    // function returning number of months between Payroll Date and Commuting Change Date
    function calcMonthsBetweenDates(d1, d2) {
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;    // if the same year = 0; if previous year = 12 etc...
        months += d2.getMonth()+1;                              // add payroll month number   
        months -= d1.getMonth()+1;                              // subtract change month number
        return months;
    }

/////// Main Function
    function proration() {
        // which calendar type?
        var select = document.getElementById("calendarType");
        var calendarType = select.options[select.selectedIndex].value;

        // Change default payroll date from input under Payroll Month
        payrollYear = $("#payrollYear").val();
	    payrollMonth = $("#payrollMonth").val();
	    payrollDate.setFullYear(payrollYear, payrollMonth-1);

	    // Set Commuting Change Date based on inputs under "New commuting startd date"
        var commutingChangeYear = $("#commutingChangeYear").val();
	    var commutingChangeMonth = parseInt($("#commutingChangeMonth").val());
	    var commutingChangeDay = (parseInt($("#commutingChangeDay").val()) - 1);    // change date minus 1 is the last day of old amount
	    var commutingChangeDate = new Date(commutingChangeYear, commutingChangeMonth - 1, commutingChangeDay+1);
	    var daysInMonth = new Date(commutingChangeYear, commutingChangeMonth, 0).getDate();
	    var dayEntered = parseInt($("#commutingChangeDay").val()); // to check if entered date is correct

	    var employeeName = $("#employeeName").val();
	    var oldCommuting = parseInt($("#oldCommuting").val());
	    var newCommuting = parseInt($("#newCommuting").val());
        
	    // Check number of months between Change Month and Payroll Month
        var monthsBetweenDates = calcMonthsBetweenDates(commutingChangeDate, payrollDate);
        // Amount to pay between Change Month and Payroll monts, ie. difference between Old and New amount * number of monts beetween Change Month and Payroll Month
	    var monthsBetweenDifference = (((newCommuting - oldCommuting) * (monthsBetweenDates - 1)));
        
        // Function checking if a day is different than Saturday or Sunday
	    function isWeekday(year, month, day) {
	        var date = new Date(year, month, day);
	        var day = date.getDay();
	        var month = date.getMonth() + 1;
	        var monthDay = date.getDate();
	        return day != 0 && day != 6;
	    }
	    // Function checking if a day is different than Saturday, Sunday or holidays listed below
	    function isBusinessWeekday(year, month, day) {
	        var date = new Date(year, month, day);
	        var day = date.getDay();
	        var month = date.getMonth() + 1;
	        var year = date.getFullYear();
	        var monthDay = date.getDate();
	        return day != 0 && day != 6
                && !(month == 1 && monthDay == 1)                       // New Year's Day
                && !(month == 1 && monthDay == 2)                       // Bank Holiday
                && !(month == 1 && monthDay == 3)                       // Bank Holiday
                && !(year == 2015 && month == 1 && monthDay == 12)      // 2015 Coming of Age Day
                && !(year == 2016 && month == 1 && monthDay == 11)      // 2016 Coming of Age Day
                && !(year == 2017 && month == 1 && monthDay == 9)       // 2017 Coming of Age Day
                && !(year == 2018 && month == 1 && monthDay == 8)       // 2018 Coming of Age Day
                && !(month == 2 && monthDay == 11)                      // National Fundation Day
                && !(year == 2018 && month == 2 && monthDay == 12)      // 2018 National Fundation Day Observed
                && !(month == 3 && monthDay == 20)                      // Spring Equinox
                && !(year == 2016 && month == 3 && monthDay == 21)      // Spring Equinox Observed
                && !(month == 4 && monthDay == 29)                      // Shōwa Day
                && !(year == 2018 && month == 4 && monthDay == 30)      // Shōwa Day Observed
                && !(month == 5 && monthDay == 3)                       // Constitution Memorial Day
                && !(month == 5 && monthDay == 4)                       // Greenery Day
                && !(month == 5 && monthDay == 5)                       // Children's Day
                && !(year == 2015 && month == 5 && monthDay == 6)       // 2015 Constitution Memorial Day Observed
                && !(year == 2015 && month == 7 && monthDay == 20)      // 2015 Sea Day
                && !(year == 2016 && month == 7 && monthDay == 18)      // 2016 Sea Day
                && !(year == 2017 && month == 7 && monthDay == 17)      // 2017 Sea Day
                && !(year == 2018 && month == 7 && monthDay == 16)      // 2018 Sea Day
                && !(month == 8 && monthDay == 11)                      // Mountain Day
                && !(year == 2015 && month == 9 && monthDay == 21)      // 2015 Respect for the Aged Day
                && !(year == 2016 && month == 9 && monthDay == 19)      // 2016 Respect for the Aged Day
                && !(year == 2017 && month == 9 && monthDay == 18)      // 2017 Respect for the Aged Day
                && !(year == 2018 && month == 9 && monthDay == 17)      // 2018 Respect for the Aged Day
                && !(year == 2015 && month == 9 && monthDay == 23)      // 2015 Autumn Equinox
                && !(year == 2016 && month == 9 && monthDay == 22)      // 2016 Autumn Equinox
                && !(year == 2017 && month == 9 && monthDay == 23)      // 2017 Autumn Equinox
                && !(year == 2018 && month == 9 && monthDay == 24)      // 2018 Autumn Equinox Observed
                && !(year == 2015 && month == 10 && monthDay == 12)     // 2015 Sports Day
                && !(year == 2016 && month == 10 && monthDay == 10)     // 2016 Sports Day
                && !(year == 2017 && month == 10 && monthDay == 9)      // 2017 Sports Day
                && !(year == 2018 && month == 10 && monthDay == 8)      // 2018 Sports Day
                && !(month == 11 && monthDay == 3)                      // Culture Day
                && !(month == 11 && monthDay == 23)                     // Labor Thanksgiving Day
                && !(month == 12 && monthDay == 23)                     // Emperor's Birthday
	            && !(year == 2018 && month == 12 && monthDay == 24);    // 2018 Emperor's Birthday Oserved
        }

        // Function returning number of days in a month which are not Saturday or Sunday
	    function getWeekdaysInMonth(month, year) {
	        var weekdays = 0;
	        for (var i = 0; i < daysInMonth; i++) {
			if (calendarType == 1) {
	            if (isWeekday(commutingChangeYear, commutingChangeMonth-1, i + 1)) weekdays++;}
			if (calendarType == 2) {
	            if (isBusinessWeekday(commutingChangeYear, commutingChangeMonth-1, i + 1)) weekdays++;}
	        }
	        return weekdays;
	    }

	    function getBeforeWeekdaysInMonth(month, year) {
		var weekdaysBefore = 0;
	        for (var i = 0; i < commutingChangeDay; i++) {
			if (calendarType == 1) {
	            if (isWeekday(commutingChangeYear, commutingChangeMonth-1, i + 1)) weekdaysBefore++;}
			if (calendarType == 2) {
	            if (isBusinessWeekday(commutingChangeYear, commutingChangeMonth-1, i + 1)) weekdaysBefore++;}
	        }
	        return weekdaysBefore;
	    }

	    function getAfterWeekdaysInMonth(month, year) {
		var weekdaysAfter = 0;
	        for (var i = commutingChangeDay; i < daysInMonth; i++) {
			if (calendarType == 1) {
	            if (isWeekday(commutingChangeYear, commutingChangeMonth-1, i + 1)) weekdaysAfter++;}
			if (calendarType == 2) {
	            if (isBusinessWeekday(commutingChangeYear, commutingChangeMonth-1, i + 1)) weekdaysAfter++;}
	        }
	        return weekdaysAfter;
	    }

        
        var changeButton = document.getElementById("confirmChange");

            var weekdays = getWeekdaysInMonth(commutingChangeMonth, commutingChangeYear);
            var weekdaysBefore = getBeforeWeekdaysInMonth(commutingChangeMonth, commutingChangeYear);
            var weekdaysAfter = getAfterWeekdaysInMonth(commutingChangeMonth, commutingChangeYear);
        wypisz();
        
        $("#confirmChange").click(function() {
            $("#confirmChange").css("display", "none");
            $("#button").css("display", "inline-block");
                    var manualMonthWorkDays = $("#manualMonthWorkDays").val();
                    var daysBeforeChange = $("#daysBeforeChange").val();
                    var daysAfterChange = $("#daysAfterChange").val();
                    weekdays = manualMonthWorkDays;
                    weekdaysBefore = daysBeforeChange;
                    weekdaysAfter = daysAfterChange;
            wypisz();
        });

    function wypisz(){
    if (calendarType == 0)
            {
                weekdays = daysInMonth;
            weekdaysBefore = commutingChangeDay;
            weekdaysAfter = (weekdays - commutingChangeDay);
    }

    var changeMonthDifference = (((Math.ceil((oldCommuting * weekdaysBefore / weekdays))) + (Math.ceil((newCommuting * weekdaysAfter / weekdays)))) - oldCommuting);     // Math.ceil rounds a number upward to its nearest integer

        // Memo
            if ((((Math.ceil((oldCommuting * weekdaysBefore / weekdays))) + (Math.ceil((newCommuting * weekdaysAfter / weekdays)))) - oldCommuting) < 0) var sign = " - "; else sign = " + ";   // change sign depending on whether the number is negative or positive. Using 'Math.abs' show the absolute value of the number
          var memoIntro = "Commuting Calculation\n• " + employeeName + " (OLD : " + numberWithCommas(oldCommuting) + "  NEW : " + numberWithCommas(newCommuting) + ") \n  " + monthNames[commutingChangeMonth] + " " + commutingChangeYear + "\n\t";
          var changeMonthText = "• Correct Amount: " + numberWithCommas(((Math.ceil((oldCommuting * weekdaysBefore / weekdays))) + (Math.ceil((newCommuting * weekdaysAfter / weekdays))))) + "\n\t\t" + commutingChangeYear + "/" + commutingChangeMonth + "/1 ~ " + commutingChangeYear + "/" + commutingChangeMonth + "/" + commutingChangeDay + ": " + numberWithCommas(oldCommuting) + " * " + weekdaysBefore + " / " + weekdays + " = " + numberWithCommas((Math.ceil((oldCommuting * weekdaysBefore / weekdays)))) + "\n\t\t" + commutingChangeYear + "/" + commutingChangeMonth + "/" + (commutingChangeDay + 1) + " ~ " + commutingChangeYear + "/" + commutingChangeMonth + "/" + daysInMonth + ": " + numberWithCommas(newCommuting) + " * " + weekdaysAfter + " / " + weekdays + " = " + numberWithCommas((Math.ceil((newCommuting * weekdaysAfter / weekdays)))) + "\n\t\t" + numberWithCommas((Math.ceil((oldCommuting * weekdaysBefore / weekdays)))) + " + " + numberWithCommas((Math.ceil((newCommuting * weekdaysAfter / weekdays)))) + " = " + numberWithCommas(((Math.ceil((oldCommuting * weekdaysBefore / weekdays))) + (Math.ceil((newCommuting * weekdaysAfter / weekdays))))) + "\n\t";
        var changeMonthText2 = "• Paid Amount: " + numberWithCommas(oldCommuting) + "\n\t• Difference: " + numberWithCommas((((Math.ceil((oldCommuting * weekdaysBefore / weekdays))) + (Math.ceil((newCommuting * weekdaysAfter / weekdays)))) - oldCommuting)) + "\n\t\t" + numberWithCommas(((Math.ceil((oldCommuting * weekdaysBefore / weekdays))) + (Math.ceil((newCommuting * weekdaysAfter / weekdays))))) + " - " + numberWithCommas(oldCommuting) + " = " + numberWithCommas((((Math.ceil((oldCommuting * weekdaysBefore / weekdays))) + (Math.ceil((newCommuting * weekdaysAfter / weekdays)))) - oldCommuting));
            var oneMonthBetweenText = "• Difference: " + numberWithCommas((newCommuting - oldCommuting)) + "\n\t\t" + numberWithCommas(newCommuting) + " - " + numberWithCommas(oldCommuting) + " = " + numberWithCommas((newCommuting - oldCommuting));
            var moreMonthsBetweenText = "• Monthly Difference: " + numberWithCommas((newCommuting - oldCommuting)) + "\n\t\t" + numberWithCommas(newCommuting) + " - " + numberWithCommas(oldCommuting) + " = " + numberWithCommas((newCommuting - oldCommuting)) + "\n\t• Difference: " + numberWithCommas(((newCommuting - oldCommuting) * (monthsBetweenDates - 1))) + "\n\t\t" + numberWithCommas((newCommuting - oldCommuting)) + " * " + (monthsBetweenDates - 1) + " = " + numberWithCommas(((newCommuting - oldCommuting) * (monthsBetweenDates - 1)));
            var currentMonthText = "\n  " + monthNames[payrollMonth] + " Commuting Amount: " + numberWithCommas((monthsBetweenDifference + changeMonthDifference + newCommuting)) + "\n\t" + numberWithCommas(monthsBetweenDifference) + sign + numberWithCommas(Math.abs(changeMonthDifference)) + " + " + numberWithCommas(newCommuting) + " = " + numberWithCommas((monthsBetweenDifference + changeMonthDifference + newCommuting));
            var currentMonthText_oneMonthBetween = "\n  " + monthNames[payrollMonth] + " Commuting Amount: " + numberWithCommas((monthsBetweenDifference + changeMonthDifference + newCommuting)) + "\n\t" + numberWithCommas(changeMonthDifference) + " + " + numberWithCommas(newCommuting) + " = " + numberWithCommas((monthsBetweenDifference + changeMonthDifference + newCommuting));

        // Validation
	    // default setting - validation OK
            var validationOK = true;
            var error = "";
            var daysBeforeChange = $("#daysBeforeChange").val();
            var daysAfterChange = $("#daysAfterChange").val();
            $("#payrollYear, #payrollMonth, #employeeName, #commutingChangeYear, #commutingChangeMonth, #commutingChangeDay, #oldCommuting, #newCommuting, #daysBeforeChange, #daysAfterChange, #payrollMonthAmount_input, #retroChangeMonthAmount_input, #retroBeforePayrollMonthAmount_input, #retroPayrollMonthAmount_input").css("backgroundColor", "white");
            $("#manualMonthWorkDays").css("backgroundColor", "#f8f8f8");

            if (($("#changeManualWorkDays").css("display") == "block") && ((daysAfterChange === "") || (daysAfterChange > 31) || (daysAfterChange < 1) || (isNaN(daysAfterChange)))) {
                validationOK = false;
                error = "\nEnter correct days after change" + error;
                $("#button").css("display", "none");
                $("#confirmChange").css("display", "inline-block");
                $("#memoArea").val(error).css("backgroundColor", "#ffe6e6");
                $("#daysAfterChange").css("backgroundColor", "#ffe6e6").focus().select();
		$("#payrollMonthAmount_input, #retroChangeMonthAmount_input, #retroBeforePayrollMonthAmount_input, #retroPayrollMonthAmount_input").css("backgroundColor", "#ffe6e6").val("");
        }

        if (($("#changeManualWorkDays").css("display") == "block") && (((+daysAfterChange) + (+daysBeforeChange)) > 31)) {
                validationOK = false;
                error = "\nCome on, total number of working days in a month cannot possibly be bigger than 31 :>" + error;
                $("#button").css("display", "none");
                $("#confirmChange").css("display", "inline-block");
                $("#memoArea").val(error).css("backgroundColor", "#ffe6e6");
                $("#daysAfterChange").css("backgroundColor", "#ffe6e6").focus().select();
                $("#daysBeforeChange").css("backgroundColor", "#ffe6e6");
                $("#manualMonthWorkDays").css("backgroundColor", "#ffe6e6");
		$("#payrollMonthAmount_input, #retroChangeMonthAmount_input, #retroBeforePayrollMonthAmount_input, #retroPayrollMonthAmount_input").css("backgroundColor", "#ffe6e6").val("");
        }

        if (($("#changeManualWorkDays").css("display") == "block") && ((daysBeforeChange === "") || (daysBeforeChange > 31) || (daysBeforeChange < 1) || (isNaN(daysBeforeChange)))) {
                validationOK = false;
                error = "\nEnter correct days before change" + error;
                $("#button").css("display", "none");
                $("#confirmChange").css("display", "inline-block");
                $("#memoArea").val(error).css("backgroundColor", "#ffe6e6");
                $("#daysBeforeChange").css("backgroundColor", "#ffe6e6").focus().select();
		$("#payrollMonthAmount_input, #retroChangeMonthAmount_input, #retroBeforePayrollMonthAmount_input, #retroPayrollMonthAmount_input").css("backgroundColor", "#ffe6e6").val("");
        }

            if (newCommuting == oldCommuting) {
                validationOK = false;
                error = "\nOld and New Commuting Amount cannot be equal" + error;
                $("#memoArea").val(error).css("backgroundColor", "#ffe6e6");
                $("#newCommuting").css("backgroundColor", "#ffe6e6").focus().select();
                $("#oldCommuting").css("backgroundColor", "#ffe6e6");
		$("#payrollMonthAmount_input, #retroChangeMonthAmount_input, #retroBeforePayrollMonthAmount_input, #retroPayrollMonthAmount_input").css("backgroundColor", "#ffe6e6").val("");
            }


            if ((newCommuting === "") || (isNaN(newCommuting) == true)) {
                validationOK = false;
                error = "\nEnter correct new commuting amount" + error;
                $("#memoArea").val(error).css("backgroundColor", "#ffe6e6");
                $("#newCommuting").css("backgroundColor", "#ffe6e6").focus().select();	
		$("#payrollMonthAmount_input, #retroChangeMonthAmount_input, #retroBeforePayrollMonthAmount_input, #retroPayrollMonthAmount_input").css("backgroundColor", "#ffe6e6").val("");
            }
            if ((oldCommuting === "") || (isNaN(oldCommuting) == true)) {
                validationOK = false;
                error = "\nEnter correct old commuting amount" + error;
                $("#memoArea").val(error).css("backgroundColor", "#ffe6e6");
                $("#oldCommuting").css("backgroundColor", "#ffe6e6").focus().select();
		$("#payrollMonthAmount_input, #retroChangeMonthAmount_input, #retroBeforePayrollMonthAmount_input, #retroPayrollMonthAmount_input").css("backgroundColor", "#ffe6e6").val("");
            }

        if ((isNaN(commutingChangeDay) == true)
            || (dayEntered < 1)
            || (commutingChangeMonth < 8 && commutingChangeMonth % 2 == 0 && dayEntered > 30)
            || (commutingChangeMonth < 8 && commutingChangeMonth % 2 == 1 && dayEntered > 31)
            || (commutingChangeMonth >= 8 && commutingChangeMonth % 2 == 0 && dayEntered > 31)
            || (commutingChangeMonth >= 8 && commutingChangeMonth % 2 == 1 && dayEntered > 30)        
        || (leapYear(commutingChangeYear) == true && commutingChangeMonth == 2 && dayEntered > 29)
            || (leapYear(commutingChangeYear) == false && commutingChangeMonth == 2 && dayEntered > 28)) {
                validationOK = false;
                error = "\nEnter correct commuting change day" + error;
                $("#memoArea").val(error).css("backgroundColor", "#ffe6e6");
                $("#commutingChangeDay").css("backgroundColor", "#ffe6e6").focus().select();
		$("#payrollMonthAmount_input, #retroChangeMonthAmount_input, #retroBeforePayrollMonthAmount_input, #retroPayrollMonthAmount_input").css("backgroundColor", "#ffe6e6").val("");
            }

            if ((isNaN(commutingChangeMonth) == true)
            || (commutingChangeMonth > 12 || commutingChangeMonth < 1)) {
                validationOK = false;
                error = "\nEnter correct commuting change month" + error;
                $("#memoArea").val(error).css("backgroundColor", "#ffe6e6");
                $("#commutingChangeMonth").css("backgroundColor", "#ffe6e6").focus().select();
		$("#payrollMonthAmount_input, #retroChangeMonthAmount_input, #retroBeforePayrollMonthAmount_input, #retroPayrollMonthAmount_input").css("backgroundColor", "#ffe6e6").val("");
            }
            if (commutingChangeYear > payrollYear || (commutingChangeYear == payrollYear && commutingChangeMonth > payrollMonth)) {
                validationOK = false;
                error = "\nCommuting amount change should be done in the past or the current month" + error;
                $("#memoArea").val(error).css("backgroundColor", "#ffe6e6");
                $("#commutingChangeMonth").css("backgroundColor", "#ffe6e6").focus().select();
		$("#payrollMonthAmount_input, #retroChangeMonthAmount_input, #retroBeforePayrollMonthAmount_input, #retroPayrollMonthAmount_input").css("backgroundColor", "#ffe6e6").val("");
            }

            function leapYear(commutingChangeYear) {
                return (commutingChangeYear % 4 == 0 && commutingChangeYear % 100 != 0 || commutingChangeYear % 400 == 0);
            }

            if (commutingChangeYear < 2015 || commutingChangeYear > 2022 || isNaN(commutingChangeYear) == true)
            {
                validationOK = false;
                error = "\nEnter year between 2015 and 2022" + error;
                $("#memoArea").val(error).css("backgroundColor", "#ffe6e6");
                $("#commutingChangeYear").css("backgroundColor", "#ffe6e6").focus().select();
		$("#payrollMonthAmount_input, #retroChangeMonthAmount_input, #retroBeforePayrollMonthAmount_input, #retroPayrollMonthAmount_input").css("backgroundColor", "#ffe6e6").val("");
            }
            if (employeeName == "") {
                validationOK = false;
                error = "\nEnter employee's name" + error;
                $("#memoArea").val(error).css("backgroundColor", "#ffe6e6");
                $("#employeeName").css("backgroundColor", "#ffe6e6").focus();
		$("#payrollMonthAmount_input, #retroChangeMonthAmount_input, #retroBeforePayrollMonthAmount_input, #retroPayrollMonthAmount_input").css("backgroundColor", "#ffe6e6").val("");
            }

            if ((isNaN(payrollMonth) == true)
                || (payrollMonth > 12 || payrollMonth < 1)) {
                validationOK = false;
                error = "\nEnter correct payroll month" + error;
                $("#memoArea").val(error).css("backgroundColor", "#ffe6e6");
                $("#payrollMonth").css("backgroundColor", "#ffe6e6").focus().select();
		$("#payrollMonthAmount_input, #retroChangeMonthAmount_input, #retroBeforePayrollMonthAmount_input, #retroPayrollMonthAmount_input").css("backgroundColor", "#ffe6e6").val("");
            }

            if (payrollYear < 2015 || payrollYear > 2022 || isNaN(payrollYear) == true)
            {
                validationOK = false;
                error = "\nEnter payroll year between 2015 and 2022" + error;
                $("#memoArea").val(error).css("backgroundColor", "#ffe6e6");
                $("#payrollYear").css("backgroundColor", "#ffe6e6").focus().select();
		$("#payrollMonthAmount_input, #retroChangeMonthAmount_input, #retroBeforePayrollMonthAmount_input, #retroPayrollMonthAmount_input").css("backgroundColor", "#ffe6e6").val("");
            }

        // Validation passed
        if (validationOK == true) {
                commutingChangeDate.setFullYear(commutingChangeYear, commutingChangeMonth - 1, commutingChangeDay+1);
                payrollDate.setFullYear(payrollYear, payrollMonth);
                $("#memoArea, #payrollMonthAmount_input, #retroChangeMonthAmount_input, #retroBeforePayrollMonthAmount_input, #retroPayrollMonthAmount_input").css("backgroundColor", "#f3ffe6");
                $("#selectButton").focus();

                // Change Month and Payroll Month is the same
                if (monthsBetweenDates == 0) {
                      if (dayEntered == 1) { changeMonthText = "o Correct Amount: " + numberWithCommas(newCommuting); }
                        $("#memoArea").val(memoIntro + changeMonthText);
                        $("#retroChangeMonthAmount_div, #retroBeforePayrollMonthAmount_div, #retroPayrollMonthAmount_div").css("display", "none");
                        $("#payrollMonthAmount_input").val(numberWithCommas(((Math.ceil((oldCommuting * weekdaysBefore / weekdays))) + (Math.ceil((newCommuting * weekdaysAfter / weekdays))))));
                    }
                // Change Month is one month before Payroll Month
                else if (monthsBetweenDates == 1) {
                      if (dayEntered == 1) { changeMonthText = oneMonthBetweenText; changeMonthText2 = ""; }
                            $("#memoArea").val(memoIntro + changeMonthText + changeMonthText2 + currentMonthText_oneMonthBetween).css("height", "21em");
                            $("#retroChangeMonthAmount_div, #retroPayrollMonthAmount_div").css("display", "block");
                            $("#retroBeforePayrollMonthAmount_div").css("display", "none");
                            $("#payrollMonthAmount_input").val(numberWithCommas((monthsBetweenDifference + changeMonthDifference + newCommuting)));
                            $("#retroChangeMonthAmount_input").val(numberWithCommas(((((Math.ceil((oldCommuting * weekdaysBefore / weekdays))) + (Math.ceil((newCommuting * weekdaysAfter / weekdays)))) - oldCommuting))*-1));
                            $("#retroPayrollMonthAmount_input").val(numberWithCommas((((Math.ceil((oldCommuting * weekdaysBefore / weekdays))) + (Math.ceil((newCommuting * weekdaysAfter / weekdays)))) - oldCommuting)));
                       }
                // Change Month is two months before Payroll Month
                else if (monthsBetweenDates == 2) {
                      if (dayEntered == 1) { changeMonthText = oneMonthBetweenText; changeMonthText2 = ""; }
                        $("#memoArea").val(memoIntro + changeMonthText + changeMonthText2 + "\n  " + monthNames[payrollDate.getMonth(payrollDate.setMonth(payrollDate.getMonth()-2))+1] + " " + payrollDate.getFullYear() + "\n\t" + oneMonthBetweenText + currentMonthText).css("height", "21em");
                    // retro amount
                        $("#retroChangeMonthAmount_div, #retroBeforePayrollMonthAmount_div, #retroPayrollMonthAmount_div").css("display", "block");
                        $("#payrollMonthAmount_input").val(numberWithCommas((monthsBetweenDifference + changeMonthDifference + newCommuting)));
                        $("#retroChangeMonthAmount_input").val(numberWithCommas(((((Math.ceil((oldCommuting * weekdaysBefore / weekdays))) + (Math.ceil((newCommuting * weekdaysAfter / weekdays)))) - oldCommuting))*-1));
                        $("#retroBeforePayrollMonthAmount_label").html("<label for='retroBeforePayrollMonthAmount_input'>" + monthNames[payrollDate.getMonth(payrollDate.setMonth(payrollDate.getMonth()))+1] + " Retro</label>");
                        $("#retroBeforePayrollMonthAmount_input").val(numberWithCommas((newCommuting - oldCommuting)*-1));
                        $("#retroPayrollMonthAmount_input").val(numberWithCommas((monthsBetweenDifference + changeMonthDifference)));
                    }
                // Change Month is more than two months before Payroll Month
                else {
                      if (dayEntered == 1) { changeMonthText = oneMonthBetweenText; changeMonthText2 = ""; }
                        $("#memoArea").val(memoIntro + changeMonthText + changeMonthText2 + "\n  " + monthNames[commutingChangeDate.getMonth(commutingChangeDate.setMonth(commutingChangeDate.getMonth()+1))+1] + " " + commutingChangeDate.getFullYear() + " to " + monthNames[payrollDate.getMonth(payrollDate.setMonth(payrollDate.getMonth()-2))+1] + " " + payrollDate.getFullYear() + "\n\t" + moreMonthsBetweenText + currentMonthText).css("height", "21em");
                     // retro amount
                        $("#retroChangeMonthAmount_div, #retroBeforePayrollMonthAmount_div, #retroPayrollMonthAmount_div").css("display", "block");
                        $("#retroBeforePayrollMonthAmount_label").html("<label for='retroBeforePayrollMonthAmount_input'>" + monthNames[commutingChangeDate.getMonth(commutingChangeDate.setMonth(commutingChangeDate.getMonth()))+1] + " to " + monthNames[payrollDate.getMonth(payrollDate.setMonth(payrollDate.getMonth()))+1] + " Retro:<label>");
                        $("#payrollMonthAmount_input").val(numberWithCommas((monthsBetweenDifference + changeMonthDifference + newCommuting)));
                        $("#retroChangeMonthAmount_input").val(numberWithCommas(((((Math.ceil((oldCommuting * weekdaysBefore / weekdays))) + (Math.ceil((newCommuting *        weekdaysAfter / weekdays)))) - oldCommuting))*-1));
                        $("#retroBeforePayrollMonthAmount_input").val(numberWithCommas((newCommuting - oldCommuting)*-1));
                        $("#retroPayrollMonthAmount_input").val(numberWithCommas((monthsBetweenDifference + changeMonthDifference)));
                    }

                    $("#selectButton").css("display", "inline-block");
                    $("#printButton").css("display", "inline-block");

            if (calendarType == 2) {
                $("#manualWorkDays").css("display", "block");
                $("#changeManualWorkDays").css("display", "none");
                $("#workDaysLabel").html("Confirm " + monthNames[commutingChangeMonth] + " " + commutingChangeYear + " manual work days in Paysys: ");
                $("#workDays").html(weekdays);
            }
            else if (calendarType == 0 || calendarType == 1) {
                $("#manualWorkDays").css("display", "none");
            }
                
             $("#retroInfo_div").css("display", "inline-block");
             $("#payrollMonthAmount_div").css("display", "block");
                
            $("#payrollMonthAmount_label").html("<label for='payrollMonthAmount_input'>" + monthNames[payrollMonth] + " Amount:</label>");
            $("#retroChangeMonthAmount_label").html("<label for='retroChangeMonthAmount_input'>" + monthNames[commutingChangeMonth] + " " + commutingChangeYear + " Retro:</label>");
            $("#retroPayrollMonthAmount_label").html("<label for='retroPayrollMonthAmount_input'>" + monthNames[payrollMonth] + " " + payrollYear + " Retro:</label>");
         }
    }
}

        function changeShow()
        {
            $("#button").css("display", "none");
            $("#manualWorkDays").css("display", "none");
            $("#confirmChange").css("display", "inline-block"); 
            $("#changeManualWorkDays").css("display", "block");         
	        $("#daysBeforeChange").focus();

            $("#daysBeforeChange").keyup(function() {           
                var sum = ((+$("#daysBeforeChange").val()) + (+$("#daysAfterChange").val()));
                $("#manualMonthWorkDays").val(sum);
            });

            $("#daysAfterChange").keyup(function() {           
            var sum = (+document.getElementById('daysBeforeChange').value) + (+document.getElementById('daysAfterChange').value);
                $("#manualMonthWorkDays").val(sum);
            });
        }
        
    function selectArea() {
        $("#memoArea").select();
    }

function printhidden(){
var isHidden = document.getElementById('printButton').style.display == "none"; 
 if (isHidden) { alert("Enter the required information and click the 'Generate Memo' button before printing."); }
else { $("#printButton").click(); }
}

function printArea(areaName) {
     childWindow = window.open('','childWindow','location=yes, menubar=yes, toolbar=yes');
        childWindow.document.open();
        childWindow.document.write('<html><head><style>body{font-family: Calibri;font-size: 11.0pt;}</style></head><body>');
        childWindow.document.write(document.getElementById('memoArea').value.replace(/\t/gi,'&emsp;&emsp;').replace(/\n/gi,'<br>'));
        childWindow.document.write('</body></html>');
        childWindow.print();
        childWindow.document.close();
        childWindow.close();
}


var vueTest = new Vue({
   el: '#vueTest',
   data: {
       message: 'Test Message'
   }
    
})