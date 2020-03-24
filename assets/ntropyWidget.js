"use strict";

let config = "";
let trigger;

window.onload = function () {

    //insert widget
    insertWidget();

    function insertWidget() {

        let targetWidget = document.getElementById('ntropyWidget');
        let configOptions = targetWidget.getAttribute('data-config');
        let src = targetWidget.getAttribute('data-src');
        let text = targetWidget.getAttribute('data-text');
        let font = targetWidget.getAttribute('data-font');
        let color = targetWidget.getAttribute('data-color');
        let textColor = targetWidget.getAttribute('data-textColor');
        let primaryColor = targetWidget.getAttribute('data-primaryColor');
        let secondaryColor = targetWidget.getAttribute('data-secondaryColor');
        if (configOptions.length > 1) {
            config = configOptions;
        }

        // insert trigger
        trigger = document.createElement('div');
        trigger.setAttribute('id', 'feedbackTrigger');
        trigger.setAttribute('class', `feedbackTrigger ${config}`);
        // targetWidget.insertAdjacentElement('afterend', trigger);
        document.body.appendChild(trigger);
        trigger = document.getElementById('feedbackTrigger');

        // trigger children
        let triggerH2 = document.createElement('h2');
        triggerH2.setAttribute('class', `feedbackTrigger_text`);
        trigger.appendChild(triggerH2);
        document.getElementsByClassName('feedbackTrigger_text')[0].textContent = text;
        document.getElementsByClassName('feedbackTrigger_text')[0].style.fontFamily = font;
        let triggerIcon = document.createElement('i');
        triggerIcon.setAttribute('class', 'feedbackTrigger_icon ntpyIcon np-bell');
        trigger.appendChild(triggerIcon);
        let triggerDiv = document.createElement('div');
        triggerDiv.setAttribute('class', 'feedbackTrigger_text-circle');
        trigger.appendChild(triggerDiv);
        document.getElementsByClassName('feedbackTrigger_text-circle')[0].textContent = 'Provide feedback?';
        // ==============

        // insert actual widget
        let widget = document.createElement('div');
        widget.setAttribute('id', 'feedbackWidget');
        widget.setAttribute('class', `feedbackWidget ${config}`);
        // targetWidget.insertAdjacentElement('afterend', widget);
        document.body.appendChild(widget);
        widget = document.getElementById('feedbackWidget');
        // widget children
        let widgetAccentBar = document.createElement('div');
        widgetAccentBar.setAttribute('id', 'feedbackWidget_accentBar');
        widgetAccentBar.setAttribute('class', 'feedbackWidget_accentBar');
        widget.appendChild(widgetAccentBar);
        // document.getElementsByClassName('feedbackWidget_accentBar')[0].textContent = 'Provide feedback?';
        let widgetCloseBtn = document.createElement('button');
        widgetCloseBtn.setAttribute('id', 'feedbackWidget_closeBtn');
        widgetCloseBtn.setAttribute('class', 'feedbackWidget_closeBtn');
        widget.appendChild(widgetCloseBtn);
        let widgetIcon = document.createElement('i');
        widgetIcon.setAttribute('class', 'feedbackWidget_closeBtnIcon ntpyIcon np-times');
        document.getElementById('feedbackWidget_closeBtn').appendChild(widgetIcon);
        // let widgetIcon = document.createElement('img');
        // widgetIcon.setAttribute('src', 'times-solid.svg');
        // widgetIcon.setAttribute('class', 'feedbackWidget_closeBtnIcon fas fa-times');
        // document.getElementById('feedbackWidget_closeBtn').appendChild(widgetIcon);
        let widgetIframe = document.createElement('iframe');
        widgetIframe.setAttribute('class', `widget_survey`);
        widgetIframe.setAttribute('src', src);
        widget.appendChild(widgetIframe);
        // ==============

        // set custom colors
        trigger.style.color = textColor;
        trigger.style.backgroundColor = color;
        let accentBar = document.getElementById('feedbackWidget_accentBar');
        accentBar.style.background = `linear-gradient(to right, ${primaryColor} 0%, ${secondaryColor} 80%)`;
        let hoverWidgetClostBtn = document.getElementById('feedbackWidget_closeBtn');
        hoverWidgetClostBtn.addEventListener('mouseover', changeColorOver);
        hoverWidgetClostBtn.addEventListener('mouseout', changeColorOut);
        function changeColorOver(e) {
            hoverWidgetClostBtn.style.color = primaryColor
        }
        function changeColorOut(e) {
            hoverWidgetClostBtn.style.color = 'rgba(0,0,0,0.75)'
        }
        if (configOptions.includes('transparent')) {
            trigger.style.backgroundColor = 'rgba(0,0,0,0)';
            trigger.style.border = `1px solid ${color}`
        }

        // set middle widget position and adjust based on actual height
        if (config.indexOf('top') === -1 &&
            config.indexOf('bottom') === -1 &&
            config.indexOf('circle') === -1 &&
            window.innerWidth > 768
        ) {
            var height = document.getElementById("feedbackTrigger").clientHeight;
            trigger.style.top = `calc(50% - ${height / 2}px)`;
        } else {
            trigger.style.top = '';
        }
    }



    // feedback trigger is clicked
    document.querySelector("#feedbackTrigger").addEventListener('click', function () {
        let feedbackWidget = document.getElementById('feedbackWidget');

        if (window.innerWidth <= 768) {
            // animate translation
            document.getElementById('feedbackTrigger').style.opacity = '0';
            feedbackWidget.style.opacity = '1';

            feedbackWidget.style.transform = `translateY(-750px)`;
            setTimeout(function () {
                feedbackWidget.style.transform = `translateY(-700px)`;

            }, 250)
        }

        if (window.innerWidth > 768) {
            // check position
            let direction = '-';
            let triggerPos = document.getElementById('feedbackTrigger').getAttribute('class');
            let widgetPos = feedbackWidget.getAttribute('class');

            // set direction for animation
            if (triggerPos.includes('left') && widgetPos.includes('left')) {
                direction = ''
            }

            // remove feedback button from page
            document.getElementById('feedbackTrigger').style.opacity = '0';
            feedbackWidget.style.opacity = '1';

            // animate translation
            feedbackWidget.style.transform = `translate(${direction}460px)`;
            setTimeout(function () {
                feedbackWidget.style.transform = `translate(${direction}400px)`;
            }, 250)
        }
    })


    document.querySelector("#feedbackWidget_closeBtn").addEventListener('click', function () {
        let feedbackWidget = document.getElementById('feedbackWidget');

        if (window.innerWidth <= 768) {
            // animate translation and bring back feedback button
            feedbackWidget.style.transform = `translateY(-750px)`;
            setTimeout(function () {
                feedbackWidget.style.transform = `translateY(700px)`;
                document.getElementById('feedbackTrigger').style.opacity = '1';
            }, 250)
        }

        if (window.innerWidth > 768) {
            // check position
            let direction = '-';
            let directionB = '';
            let triggerPos = document.getElementById('feedbackTrigger').getAttribute('class');
            let widgetPos = feedbackWidget.getAttribute('class');

            // set direction for animation
            if (triggerPos.includes('left') && widgetPos.includes('left')) {
                direction = ''
                directionB = '-'
            }

            // animate translation and bring back feedback button
            feedbackWidget.style.transform = `translate(${direction}460px)`;
            setTimeout(function () {
                feedbackWidget.style.transform = `translate(${directionB}400px)`;
                document.getElementById('feedbackTrigger').style.opacity = '1';
            }, 250)
        }
    })

    window.onresize = function (event) {
        if (config.indexOf('top') === -1 &&
            config.indexOf('bottom') === -1 &&
            config.indexOf('circle') === -1 &&
            window.innerWidth > 768
        ) {
            var height = document.getElementById("feedbackTrigger").clientHeight;
            trigger.style.top = `calc(50% - ${height / 2}px)`;
        } else {
            trigger.style.top = '';
        }
    };
};