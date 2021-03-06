fnc.uiControls.panels.wrappanel = (function () {
    var panel = fnc.uiControls.panels.panel;

    var wrappanel = function (name, publicProperties, privateProperties) {
        this.initialize(name, publicProperties, privateProperties);
        this.tag = "wrappanel";
    }
    var placeChildrenInsideWrapPanel = function() {
        var currentLeft = 0;
        var currentTop = 0;
        var maxHeight = 0;
        var panelHeight = 0;
        var panelWidth = this.properties['width'] || null;
        for(var i= 0, child; child=this.children.get(i); i++) {
            var style = child.dom.style;
            var width = parseInt(style.width.slice(0, -2));
            var height = parseInt(style.height.slice(0, -2));
            if (panelWidth && (currentLeft + width) > parseInt(panelWidth)) {
                currentLeft = 0;
                currentTop = currentTop + maxHeight;
                maxHeight = height;
            } else {
                if(height > maxHeight) {
                    maxHeight = height;
                }
            }
            style.left = currentLeft + 'px';
            style.top = currentTop + 'px';
            currentLeft = currentLeft + width;

        }
        this.dom.style.width = (currentLeft > this.width ? currentLeft : this.width) + 'px';
        var newHeight = (currentTop + maxHeight);
        this.dom.style.height = (newHeight > this.height ? newHeight : this.height) + 'px';
    }

    wrappanel.prototype = new panel();
    wrappanel.prototype.render = function(options) {
        //create this.dom as per parent
        panel.prototype.render.call(this, options);

        this.renderChildren({available_height: parseInt(this.dom.style.height), available_width: parseInt(this.dom.style.width)});
        placeChildrenInsideWrapPanel.call(this);
        return this.dom;
    };
    return wrappanel;
})();

