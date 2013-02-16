define(['dialog'],
function(Dialog) {

  describe("dialog", function() {
    
    it('should export constructor', function() {
      expect(Dialog).to.exist;
      expect(Dialog).to.be.a('function');
    });
    
  });
  
  return { name: "test.dialog" }
});
