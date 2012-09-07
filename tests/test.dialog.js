define(['dialog/dialog',
        'chai'],
function(Dialog, chai) {
  var expect = chai.expect;

  describe("dialog", function() {
    
    it('should export constructor', function() {
      expect(Dialog).to.exist;
      expect(Dialog).to.be.a('function');
    });
    
  });
  
  return { name: "test.dialog" }
});
