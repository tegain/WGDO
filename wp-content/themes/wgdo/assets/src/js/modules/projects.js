var Login = require('./login');

var Projects = {
    manageList: function () {
        this.manageFilter();

        $('#gu-Projects-list').find('.js-gu-User-loggedOut').each(function () {
            var $link = $(this),
                projectURL = $link.attr('href');

            Login.loadForm($link, '/wgdo/espace-adherents/', projectURL);
        });
    },

    manageFilter: function () {
        $('.gu-Filter-dropdown').find('select').on('change', function (e) {
            var $select = $(this),
                $options = $select.find('option').not('.js-gu-Filter-option_all'),
                $term = $select.find('option:selected'),
                termID = $term.attr('data-id'),
                allIds = [];
            e.preventDefault();

            for (var i = 0; i < $options.length; i++) {
                allIds.push($options[i].getAttribute('data-id'));
            }
            $('.js-gu-Filter-option_all').attr('data-id', '['+ allIds +']');

            Projects.getPostsFromFilter(termID)
        });
    },

    getPostsFromFilter: function (id) {
        var filterRequestId = JSON.parse(id);

        //$("#loading-animation").show();
        var ajaxURL = 'http://localhost/wgdo/wp-admin/admin-ajax.php'; // TODO: change url
        $.ajax({
            type: 'POST',
            url: ajaxURL,
            data: {"action": "load-filter2", term: filterRequestId },
            success: function(response) {
                $(".gu-Projects-list").html(response);
                //$("#loading-animation").hide();
                return false;
            },
            error: function(xhr, status, error) {
                var err = JSON.parse(xhr.responseText);
                alert(err.Message);
              }
        });
    },

    getAllPostsIds: function () {

    }
}

module.exports = Projects;
