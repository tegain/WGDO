var Modal = {
    params: {
        defaultClass: 'gu-Modal-default',
        closeBtnClass: 'gu-Modal-close',
        closedModalClass: 'gu-Modal-isClosed',
        bodyAttribute: 'data-hasModal'
    },

    /**
     * Create Modal
     * @param content [html object] => The content to display inside modal
     * @param modalclass [string] => optional specific class added to the modal
     *
     * Create a modal HTML element and append content inside
     */
    create: function (content, modalclass) {
        var modalClass = (modalclass) ? modalclass : Modal.params.defaultClass,
            // Check if a modal already exists, then reset its content instead of creating a new one
            $modal = ($('#gu-Modal').length) ?
                      $('#gu-Modal') :
                      $('<div id="gu-Modal" class="gu-Modal '+ modalClass +'" />');

        $('body').attr(Modal.params.bodyAttribute, true);
        $modal.html('').removeClass(Modal.params.closedModalClass);

        $modal.append(content);
        $modal.appendTo('body');

        $('body').on('ModalLoaded', function () {
	        $modal.append('<button class="'+ Modal.params.closeBtnClass +'" />');
        });

        // Close modal
        $modal.on('click', '.'+ Modal.params.closeBtnClass, function() {
            Modal.close($modal);
        });

        $(document).on('keyup', function(e) {
            if (e.keyCode == 27) {
                Modal.close($modal);
            }
        });
    },


    /**
     * Show existing (but hidden) modal
     */
    show: function (modal) {
        if (modal && !$(modal+':visible').length) {
            $(modal).removeClass(Modal.params.closedModalClass);
            $('body').attr(Modal.params.bodyAttribute, true);
        }
    },


    /**
     * Close / Hide modal
     */
    close: function (modal) {
        var $modal = modal;

        $modal.addClass(Modal.params.closedModalClass);
        $('body').removeAttr(Modal.params.bodyAttribute);
    },
}

module.exports = Modal;
