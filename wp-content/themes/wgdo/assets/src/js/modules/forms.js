var Forms = {

    /**
     * Search form manager
     */
    searchForm: function () {
        var $form = $('#gu-search'),
            $formWrapper = $('.gu-Search__wrapper'),
            $formToggler = $('.gu-Search__toggler'),
            toggleAttr = 'data-toggled';

        /**
         * Hide / Show form functions (manage display with 'data-toggled' attribute)
         */
        function showSearch () {
            $formWrapper.attr(toggleAttr, true);
            $formToggler.attr(toggleAttr, true);
            $('body').attr('data-no-scroll', '');
            $formWrapper.find('.gu-Search__input').focus();
        }

        function hideSearch () {
            $formWrapper.attr(toggleAttr, false);
            $formToggler.attr(toggleAttr, false);
            $('body').removeAttr('data-no-scroll');
        }

        /**
         * Toggle form by clicking on the button
         */
        $formToggler.click(function () {
            if ($formWrapper.attr(toggleAttr) == "false") {
                showSearch();
            }
            else {
                hideSearch();
            }
        });

        /**
         * Hide Form when clicking on document (but not on form)
         */
        $form.click(function (e) {
            e.stopPropagation()
        });

        $('.gu-Search__wrapper').click(function () {
            hideSearch()
        });


        /**
         * Hide form when pressing 'Escape' key
         */
        $(document).keyup(function(e) {
            if (e.keyCode == 27 && $formWrapper.attr(toggleAttr) == "true") {
                hideSearch()
            }
        });

    },


    /**
     * Newsletter form
     */
    newsletterForm: function () {
        var $widget = $('.widget_newsletterwidgetminimal'),
            $formField = $widget.find('.tnp-email');

        $formField.click(function () {
            $widget.addClass('is-Focused');
        });

        if ($formField.val() !== '') {
            $widget.addClass('is-Focused');
        }
    },
}

module.exports = Forms;
