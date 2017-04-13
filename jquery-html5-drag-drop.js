/**
 * Based on MDN's drag and drop api articles
 * https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/
 * @param {Object} $
 */
(function ($) {
    /**
     * Fired on a droppable when a draggable is over it
     * @param {Object} config
     * @param {Event} e
     */
    var over = function (config, e) {
        var dataTransfer = e.originalEvent.dataTransfer,
                resp = config.over.call(this, e, dataTransfer);
        // allow drop of not canceled
        if (false !== resp) {
            e.preventDefault();
        }
        return resp;
    },
            /**
             * Fired on a droppable when a draggable is dropped on it
             * @param {Object} config
             * @param {Event} e
             */
            drop = function (config, e) {
                var dataTransfer = e.originalEvent.dataTransfer;
                if (config.dropEffect) {
                    dataTransfer.dropEffect = config.dropEffect;
                }
                if (config.effectAllowed) {
                    dataTransfer.effectAllowed = config.effectAllowed;
                }
                var resp = config.drop.call(this, $(dataTransfer.getData('text')).get(0), e, dataTransfer);
                // allow drop of not canceled
                if (false !== resp) {
                    e.preventDefault();
                }
                return resp;
            };
    $.fn.draggable = function (config) {
        config = $.extend({
            /* 
             * {object[src,offsetX,offsetY]} || {string} path/to/image
             * offsets are where the image should appear relative to the mouse pointer
             */
            dragImage: null,
            /*
             * The type of drag and drop being done
             * Value may include none|move|copy|link
             */
            dropEffect: 'move',
            /*
             * Provides all types of operations possible
             * Values may include none|move|copy|link|copyMove|copyLink|linkMove|all
             */
            effectAllowed: 'all',
            /**
             * Indicates that draggable items are also sortable
             */
            sortable: true,
            /* Fired when an element or text selection is being dragged. */
            drag: function (e) {},
            /* Fired when the user starts dragging an element or text selection. */
            start: function () {},
            /* Fired when a drag operation is being ended (for example, 
             * by releasing a mouse button or hitting the escape key) 
             */
            end: function () {},
            /* Fired when a dragged element or text selection enters a valid drop target. */
            enter: function () {},
            /* Fired when a dragged element or text selection leaves a valid drop target. */
            leave: function () {},
            /* Fired when an element is no longer the drag operation's 
             * immediate selection target.
             */
            exit: function () {},
            /* Fired when an element or text selection is being dragged over a 
             * valid drop target (every few hundred milliseconds)
             */
            over: function (e) {
                e.preventDefault();
            },
            /* Fired when an element or text selection is dropped on a valid drop target. */
            drop: function () {},
            /*
             * Fired when an element has been sorted
             */
            sorted: function (e, selector) {

            }
        }, config);
        return this.each(function () {
            $(this).attr('draggable', true)
                    .on('drag', function (e) {
                        return config.drag.call(this, e, e.originalEvent.dataTransfer);
                    })
                    .on('dragstart', function (e) {
                        var dataTransfer = e.originalEvent.dataTransfer;
                        $(this).addClass('dragging');
                        if (!$(this).attr('id')) {
                            $(this).attr('id', '_' + Date.now());
                        }
                        dataTransfer.setData('text/plain', '#' + $(this).attr('id') + '.dragging');

                        if (config.dragImage) {
                            var img = new Image(),
                                    src = config.dragImage,
                                    offsetX = 0, offsetY = 0;
                            // dragImage config is an object
                            if ($.isPlainObject(config.dragImage)) {
                                src = config.dragImage.src;
                                offsetX = config.dragImage.offsetX || 0;
                                offsetY = config.dragImage.offsetY || 0;
                            }
                            // only apply image if src is real
                            if (src) {
                                img.src = src;
                                dataTransfer.setDragImage(img, offsetX, offsetY);
                            }
                        }
                        if (config.dropEffect) {
                            dataTransfer.dropEffect = config.dropEffect;
                        }
                        if (config.effectAllowed) {
                            dataTransfer.effectAllowed = config.dropEffect;
                        }
                        return config.start.call(this, e, dataTransfer);
                    })
                    .on('dragend', function (e) {
                        $(this).removeClass('dragging');
                        return config.end.call(this, e, e.originalEvent.dataTransfer);
                    })
                    .on('dragenter', function (e) {
                        // don't allow enter on self
                        if ($(this).hasClass('dragging'))
                            return false;
                        return config.enter.call(this, e, e.originalEvent.dataTransfer);
                    })
                    .on('dragleave', function (e) {
                        if ($(this).hasClass('dragging'))
                            return false;
                        return config.leave.call(this, e, e.originalEvent.dataTransfer);
                    })
                    .on('dragexit', function (e) {
                        return config.exit.call(this, e, e.originalEvent.dataTransfer);
                    });
            // only allow draggables on self if enabled
            if (config.sortable) {
                $(this).on('dragover', function (e) {
                    return over.call(this, config, e);
                })
                        .on('drop', function (e) {
                            var $dragged = $(e.originalEvent.dataTransfer.getData('text'));
                            $(this).before($dragged);
                            config.sorted.call($dragged.get(0), this);
                            return drop.call(this, config, e);
                        });
            }
        });
    };
    $.fn.droppable = function (config) {
        config = $.extend({
            dropEffect: 'move',
            effectAllowed: 'all',
            over: function (e) {
            },
            drop: function () {}
        }, config);
        return this.each(function () {
            $(this).on('dragover', function (e) {
                return over.call(this, config, e);
            })
                    .on('drop', function (e) {
                        return drop.call(this, config, e);
                    });
        });
    };
})(jQuery);