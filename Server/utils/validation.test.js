var expect=require('expect');
const  {isRealString} =require('./validation');

describe('isRealString' ,()=>{
    it('It should reject non-string value ',()=>{
        var res=isRealString(545);
        expect(res).toBe(false);
        });

        it('it reject if only spaces',()=>{
            var str=isRealString('                  ');
            expect(str).toBe(false);
        });

        it('it is perfect string',()=>{
        var str=isRealString("aniket bunny");      
        expect(str).toBe(true);
        });
});

