Router.route('/comenzarPartida/:_id', {
    template:"comenzarPartida",    
    name:"ConfigPartida", 
    data: function(){
      var userID = this.params._id;
      return Users.findOne({_id:userID});
    }
});