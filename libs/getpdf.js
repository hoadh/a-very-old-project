var ratio=1.5;
var filename = 'files/example.pdf';
PDFJS.workerSrc = "libs/pdf.js";
PDFJS.getPdf(filename, function getPdfFile(data) {
    var pdf = new PDFJS.PDFDoc(data);
    var pageNum = pdf.numPages;
    var pages=[];
    var scale = ratio;
    var i;

    //Tải các trang pdf vào mảng pages
    //trang pdf được tính từ 1, nhưng mảng pages bắt đầu tính từ 0.
    for (i=1;i<=pageNum;i++) {
        pages.push(pdf.getPage(i));
    }
    var ul = document.createElement("ul");
    for (i=0;i<pageNum;i++) {
        var div_page = document.createElement("div");
        div_page.id = "page-" + i;
                    
        var anchor = document.createElement("a");
        anchor.name = 'page-a-' + i;
                        
        var canvas = document.createElement("canvas");
        canvas.id = 'canvas-' + i;
        canvas.innerHTML = "Trình duyệt của bạn không hỗ trợ CANVAS.";
        var context = canvas.getContext('2d');
        pages[i].startRendering(context);
        canvas.height = pages[i].height * scale;
        canvas.width = pages[i].width * scale;
        var l = "left:0;";
        var t = "top:" + (canvas.height * i + 10 * (i+1)) + "px;";
        canvas.setAttribute("style", l+t + "z-index:0;");
        
        var layerBeforeCanvas = document.createElement("div");
        layerBeforeCanvas.id = "layer-for-canvas-" + i;
        layerBeforeCanvas.className = "layer-before-canvas";
        var h = "height:"+ canvas.height + "px;";
        var w = "width:"+ canvas.width + "px;";
        layerBeforeCanvas.setAttribute("style", h+w+l+t + "z-index:1;");
                    
        div_page.appendChild(anchor);
        div_page.appendChild(canvas);
        div_page.appendChild(layerBeforeCanvas);
        document.getElementById("viewer").appendChild(div_page);
        
        var li = document.createElement("li");
        var goTo = document.createElement("a");
        goTo.setAttribute("href", "#page-a-"+i);
        goTo.innerHTML="Trang "+ (i+1);
        li.appendChild(goTo);
        ul.appendChild(li);
    }
    /*
     * TODO: Viết js thực hiện cuộn tới anchor (absolute không thể dùng với anchor).
     * 
     * http://css-tricks.com/snippets/jquery/smooth-scrolling/
     * http://www.position-relative.net/creation/anchor
     * http://stackoverflow.com/questions/3972082/problem-with-html-anchor-in-absolute-div-300px-from-the-top
     * 
     */
    document.getElementById("go_to_page").appendChild(ul);
});