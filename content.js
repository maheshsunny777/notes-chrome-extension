//displayes copy buttons whenever this function is fired
function displayButtons(x,y){
	//creating universal button and adding styles to it
	let universal=$("<button class='uni-button'>Save to notes</button>");
	universal.css({
			"border":'none',
			'border-radius':'10px',
			'background-color':"black",
			"color":"white",
			"padding":"20px 10px",
			"position":"absolute",
			"left":`${x}px`,
			"top":`${y}px`
		})
	$('body').append(universal);
	//creating page specific button
	let pageSpecific=$("<button class='page-button'>Save to page notes</button>");
	pageSpecific.css({
			"border":'none',
			'background-color':"black",
			"color":"white",
			'border-radius':'10px',
			"padding":"20px 10px",
			"position":"absolute",
			"left":`${x+110}px`,
			"top":`${y}px`
		})
	$('body').append(pageSpecific);
}
//returns the selected text
function getSelectionText(){
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}
//main logic of the extension.
var isDragging = false;
//event listenr for dragging mouse.
$(document)
    .mousedown(function() {
        isDragging = false;
    })
    .mousemove(function() {
        isDragging = true;
     })
    .mouseup(function(e) {
        if (isDragging) {
            let selected=getSelectionText();
            //display buttons
            if(selected) displayButtons(e.pageX,e.pageY);
            //event listener for universal button
        	$('.uni-button').click(()=>{
        		let currentNotes=''
        		chrome.storage.sync.get([`universal`], function(result) {
		        	currentNotes=(result[`universal`])?result[`universal`]:'';
		        	if(currentNotes){
		        	chrome.storage.sync.set({['universal']: `${currentNotes}
${selected}`});
		        }else{
					chrome.storage.sync.set({[`universal`]: `${selected}`});		
				}
		        });
        		$('.uni-button').off('click');	
        	})
        	//event listener for page specific buuton.
        	$('.page-button').click(()=>{
        		let currentNotes='';
					chrome.storage.sync.get([`${document.URL}`], function(result) {
						currentNotes=(result[`${document.URL}`])?result[`${document.URL}`]:'';
						if(currentNotes){
		          		chrome.storage.sync.set({[`${document.URL}`]: `${currentNotes}
${selected}`});			
						}else{
							chrome.storage.sync.set({[`${document.URL}`]: `${selected}`});		
						}
		        	});
        		$('.uni-button').off('click');	
        	})
	    }else{
	    	//removing buttons from the screen.
	    	setTimeout(()=>{
	    		$('.uni-button').remove();
	    		$('.page-button').remove();
	    	},10);
	    }
	});
