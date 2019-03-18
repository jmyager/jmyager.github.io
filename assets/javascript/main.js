
$(document).ready(function () {

     // disable smooth scrolling on microsoft and edge browsers (parallax flicker bugfix)
     if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
        $('body').on("mousewheel", function () {
            event.preventDefault();
            var wd = event.wheelDelta;
            var csp = window.pageYOffset;
            window.scrollTo(0, csp - wd);
        });
    }

    // hide the scrollToTop button
    $('#scrollBtn').hide();


    // Scroll on anchor click

    // Add smooth scrolling to all links
    $("a").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1000, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });


    // When the user scrolls down 20px from the top of the document, show the button
    //Check to see if the window is top if not then display button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $('#scrollBtn').fadeIn();
        } else {
            $('#scrollBtn').fadeOut();
        }
    });

    // Click event to scroll to top
    $('#scrollBtn').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

    $(".projectLink").on("click", function () {
        $("#demoBtn").attr(
            "href",
            $(this).attr("data-demo")
        );
        $("#githubBtn").attr(
            "href",
            $(this).attr("data-github")
        )

        $(".projectModal").modal("show");
    })

    $(function () {
        $('.projectModal').on('show.bs.modal', function () {
            $('.portfolioGrid').addClass('blur');
        });

        $('.projectModal').on('hide.bs.modal', function () {
            $('.portfolioGrid').removeClass('blur');
        });
    });


    // array of project objects
    const projects = [
        {
            name: 'BassSavvy',
            tags: ['Freelance', 'Node.js', 'Express', 'JavaScript', 'APIs', 'Fullstack',],
            filters: ['JavaScript', 'jQuery', 'Node.js', 'Freelance', 'Frontend', 'Backend', 'Fullstack', 'API', 'Express'],
            imgSrc: 'assets/images/basssavvy_edited.jpg',
            imgAlt: 'BassSavvy project thumbnail',
            demoUrl: 'http://www.basssavvy.com/',
            gitUrl: 'https://github.com/jmyager/Levels'
        },
        {
            name: 'MySuperTrainer',
            tags: ['Freelance', 'Frontend', 'Bootstrap', 'JavaScript', 'HTML', 'CSS'],
            filters: ['Freelance', 'Frontend', 'Bootstrap', 'JavaScript', 'HTML', 'CSS'],
            imgSrc: 'assets/images/mysupertrainer.png',
            imgAlt: 'MySuperTrainer project thumbnail',
            demoUrl: 'http://www.mysupertrainer.com/',
            gitUrl: 'https://github.com/jmyager/mySuperTrainer'
        },
        {
            name: 'Popin',
            tags: ['React', 'Express', 'MongoDB', 'APIs', 'React-Router'],
            filters: ['React', 'Express', 'MongoDB', 'API', 'Fullstack', 'Backend'],
            imgSrc: 'assets/images/popin.png',
            imgAlt: 'poppin app project thumbnail',
            demoUrl: 'https://frozen-bastion-62666.herokuapp.com/',
            gitUrl: 'https://github.com/jmyager/Popin'
        },
        {
            name: "Buzz'd",
            tags: ['JavaScript', 'jQuery', 'Hammerjs', 'Materialize', 'MySql', 'Express', 'Sequelize'],
            filters: ['JavaScript', 'jQuery', 'Frontend', 'MySql', 'Express'],
            imgSrc: 'assets/images/buzzd.png',
            imgAlt: 'buzzd app project thumbnail',
            demoUrl: 'https://fathomless-depths-99227.herokuapp.com/',
            gitUrl: 'https://github.com/jmyager/Buzz-d'
        },
        {
            name: 'Imprompto',
            tags: ['JavaScript', 'jQuery', 'APIs', 'HTML', 'CSS'],
            filters: ['JavaScript', 'jQuery', 'API', 'Frontend'],
            imgSrc: 'assets/images/imprompto_edited.jpg',
            imgAlt: 'imprompto app project thumbnail',
            demoUrl: 'https://shreedamin.github.io/imprompto/',
            gitUrl: 'https://github.com/jmyager/ImprompTo'
        },
        {
            name: 'Memory Game',
            tags: ['React', 'JavaScript', 'HTML', 'CSS'],
            filters: ['React', 'JavaScript'],
            imgSrc: 'assets/images/memory-game_edited.jpg',
            imgAlt: 'memory game project thumbnail',
            demoUrl: 'https://fathomless-mountain-34042.herokuapp.com/',
            gitUrl: 'https://github.com/jmyager/MemoryGame'
        },
        {
            name: 'Train Schedule',
            tags: ['Firebase', 'jQuery', 'Bootstrap', 'JavaScript'],
            filters: ['Firebase', 'jQuery', 'Bootstrap', 'JavaScript'],
            imgSrc: 'assets/images/train-schedule_edited.jpg',
            imgAlt: 'train schedule project thumbnail',
            demoUrl: 'http://www.joshyager.com/Train-Schedule/',
            gitUrl: 'https://github.com/jmyager/Train-Schedule'
        },
        {
            name: 'Trivia Game',
            tags: ['JavaScript', 'JS Timers', 'JS Functions', 'Bootstrap', 'HTML', 'CSS'],
            filters: ['JavaScript', 'Bootstrap'],
            imgSrc: 'assets/images/trivia-game_edited.jpg',
            imgAlt: 'trivia game project thumbnail',
            demoUrl: 'http://www.joshyager.com/TriviaGame/',
            gitUrl: 'https://github.com/jmyager/TriviaGame'
        },
        {
            name: 'Bamazon',
            tags: ['Node.js', 'MySql', 'JavaScript'],
            filters: ['Node.js', 'MySql', 'JavaScript'],
            imgSrc: 'assets/images/bamazon_edited.jpg',
            imgAlt: 'bamazon app project thumbnail',
            demoUrl: 'https://raw.githubusercontent.com/jmyager/Bamazon_app/master/images/bamazonCustomer.gif',
            gitUrl: 'https://github.com/jmyager/Bamazon_app'
        }
    ]


    // Function to append projects to page
    function appendProjects(projectBatch) {
        // create template to hold project html
        let projectTemplate = [];
        // loop through filtered projects and add to template
        projectBatch.forEach(function (project) {
            // loop through our tags and create template html
            let tags = '';
            project.tags.forEach(function (tag) {
                tags += `
                <p>${tag}</p>
            `;
            })
            // add to project template html
            projectTemplate.push(`
        <figure class="effect-julia">
                        <img src=${project.imgSrc} alt=${project.imgAlt} />
                        <figcaption data-demo=${project.demoUrl} data-git=${project.gitUrl}>
                            <h2>${project.name}</h2>
                            <div>
                                ${tags}
                            </div>
                            
                        </figcaption>
                    </figure>
        `);
        })

        // fade out and remove all current projects
        $("figure").fadeOut(100, function () {
            // remove all current figures
            $(this).remove();
        });
        setTimeout(appendNewProjects, 300)

        function appendNewProjects() {
            // loop through template and append new projects
            projectTemplate.forEach(function (project) {
                $(project).hide().appendTo('#projectWell').fadeIn(1000);
            });
        }

    }


    // Run function to append all project when page initially loads
    appendProjects(projects);


    // Filter button functions //
    // ======================= //
    $("#filterList").on("click", "li", function () {
        // array to hold newly filtered projects
        let filteredProjects = [];
        // remove active class from focused button
        $('ul').find('li.filter-active').removeClass()
        // pull filter data value of the li inside the button
        var filter = $(this).data('filter');
        // add active class to parent button (li was clicked)
        $(this).addClass('filter-active');
        // display filter in text "Show me 'All' Projects"
        $('#filter').text(`"${filter}"`);
        // filter all projects based on filter value
        if (filter === "All") {
            filteredProjects = projects;
        }
        else {
            filteredProjects = projects.filter(e => e.filters.includes(filter));
        }
        appendProjects(filteredProjects);
    });


    // if project is clicked
    $('body').on('click', 'figure', function () {
        // show any previously hidden content and remove any project anchors
        $('.project-anchor-left').remove();
        $('.project-anchor-right').remove();
        $('figcaption').children('div').show();
        // pull data from figcaption for project urls
        let demoUrl = $(this).children('figcaption').data('demo');
        let gitUrl = $(this).children('figcaption').data('git');
        // hide project contents
        $(this).children('figcaption').children('div').hide();
        // append project anchors to figcaption
        $(this).children('figcaption').append(`
            <a href=${demoUrl} target="_blank" class="project-anchor-left"><h6>Demo</h6></a>
            <a href=${gitUrl} target="_blank" class="project-anchor-right"><h6>Github</h6></a>
        `)
    })


});