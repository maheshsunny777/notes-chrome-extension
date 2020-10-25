//set the notes mode
var mode='universal';
//Get previously stored data from chrome's storage.
getNotes('universal')
//listen for universal button click event.
$('.universalNotesbtn').click(()=>{
	$('.universalNotesbtn').addClass('selected');
	$('.pageSpecificNotesbtn').removeClass('selected');
	if (mode!=='universal'){
		mode='universal';
		getNotes('universal')
	}
})
//listen for page specific button click event.
$('.pageSpecificNotesbtn').click(()=>{
	$('.universalNotesbtn').removeClass('selected');
	$('.pageSpecificNotesbtn').addClass('selected');
	if(mode!=='pageSpecific'){
		mode='pageSpecific';
		getNotes('pageSpecific')
	}
})
//listen for save button click event.
$('.save').click(setNotes);
//Set notes data to chrome storage.
function setNotes(){
	let data=$('#noteArea').val();
	if(mode==='universal'){
		chrome.storage.sync.set({['universal']: data});
	}else{
		chrome.tabs.query({active: true,lastFocusedWindow: true}, function(array_of_Tabs){
			let tab=array_of_Tabs[0];
			chrome.storage.sync.set({[`${tab.url}`]: data});
    	});
	}
}
//Get notes data from chrome's storage.
function getNotes(){
	if(mode==='universal'){
		chrome.storage.sync.get([`${mode}`], function(result) {
          $('#noteArea').val(result[`universal`]);
        });
	}else{
		chrome.tabs.query({active: true,lastFocusedWindow: true}, function(array_of_Tabs){
			let tab=array_of_Tabs[0];
			chrome.storage.sync.get([`${tab.url}`], function(result) {
          		$('#noteArea').val(result[`${tab.url}`]);
        	});
    	});
	}
}
