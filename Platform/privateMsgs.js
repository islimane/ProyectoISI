if(Meteor.isClient){
	Template.privateMsgs.helpers({
		"getMsgs": function(){
			return PrivateMsgs.find({to: Meteor.userId()}).fetch();
		}
	});

	Template.privateMsgs.events({
		"click .newMsg": function(){
			var newMsg = $("#writeNewMsg");
			if(newMsg.is(":visible")){
				newMsg.hide();
			}else{
				newMsg.show();
			}
		}
	});
}