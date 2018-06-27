		var width = window.innerWidth;
        var height = window.innerHeight;

        var stage = new Konva.Stage({
            container: 'container',
            width: width,
            height: height
        });

        var layer = new Konva.Layer();
        stage.add(layer);

        var textNode = new Konva.Text({
            text: 'Some text here',
            x: 50,
            y: 50,
            fontSize: 20,
        });

        layer.add(textNode);
        layer.draw();

        textNode.on('dblclick', () => {
            // create textarea over canvas with absolute position

            // first we need to find its positon
            var textPosition = textNode.getAbsolutePosition();
            var stageBox = stage.getContainer().getBoundingClientRect();

            var areaPosition = {
                x: textPosition.x + stageBox.left,
                y: textPosition.y + stageBox.top
            };


            // create textarea and style it
            var textarea = document.createElement('textarea');
            document.body.appendChild(textarea);

            textarea.value = textNode.text();
            textarea.style.position = 'absolute';
            textarea.style.top = areaPosition.y + 'px';
            textarea.style.left = areaPosition.x + 'px';
            textarea.style.width = textNode.width();

            textarea.focus();


            textarea.addEventListener('keydown', function (e) {
                // hide on enter
                if (e.keyCode === 13) {
                    textNode.text(textarea.value);
                    layer.draw();
                    document.body.removeChild(textarea);
                }
            });
        });