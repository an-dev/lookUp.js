(function ($) {
    $.fn.extend({
        lookUp: function (opt) {
            var self = this;
            opt = $.extend({
                changeClass: "changed", //class to append to changed elements
                msg: "Unsaved changes will be lost.\n Continue?", //confirm message for changed values
                windowEvent: false, //enable/disable window event handling, by default disabled
                handle: function() {
                    simplehandler()              
                }
            }, opt || {});

            var fs = $(this);
            fs.each(function () {
                this.reset();
                var f = $(this);
                var is = f.find(':input');
                f.lookUp_save();
                setInterval(function () {
                    is.each(function () {
                        var node = $(this);
                        var def = $.data(node.get(0), 'lookUp_Def');
                        if (node.lookUp_ifVal() == def) {
                            if (opt.changeClass) node.removeClass(opt.changeClass);
                        } else {
                            if (opt.changeClass) node.addClass(opt.changeClass);
                        }
                    });
                }, 500); //polling time(ms) to check if a value has been changed in the form
            });

            function simplehandler(){
                $(self).submit(function (e) {
                    if (beforeunload(e) == false) {
                        e.preventDefault();
                    }
                });
            }

            function eventhandler(){

                if(window.attachEvent){
                    window.attachEvent('onbeforeunload', beforeunload);
                }
                else if(window.addEventListener){
                    window.addEventListener('beforeunload', beforeunload, false);
                }

            }

            function beforeunload(e) {
                var changed = false;
                fs.each(function () {
                    if ($(this).find(':input').lookUp_isChanged()) {
                        changed = true;
                        return false;
                    }
                });
                if (changed) {
                    e = e || window.event;
                    if (opt.windowEvent){
                        opt.handle = eventhandler();
                        e.returnValue = opt.msg;
                    }
                    else{
                        e.returnValue = confirm(opt.msg);
                    }
                    return e.returnValue;
                }
            }
            if (opt.windowEvent){
                opt.handle = eventhandler();
            }
            opt.handle();
        },
        lookUp_save: function () {
            var node = $(this);
            if (node.is('form')) {
                node.find(':input').each(function () {
                    $(this).lookUp_save();
                });
            } else if (node.is(':input')) {
                $.data(node.get(0), 'lookUp_Def', node.lookUp_ifVal());
            }
        },
        lookUp_isChanged: function () {
            var changed = false;
            this.each(function () {
                var node = $(this);
                if (node.eq(':input')) {
                    var def = $.data(node.get(0), 'lookUp_Def');
                    if (typeof def != 'undefined' && def != node.lookUp_ifVal()) {
                        changed = true;
                        return false;
                    }
                }
            });
            return changed;
        },
        lookUp_ifVal: function () {
            var node = $(this.get(0));
            if (node.is(':radio,:checkbox')) {
                var r = node.prop('checked');
            } else if (node.is(':input')) {
                var r = node.val();
            }
            return r;
        }
    });
})(jQuery);
