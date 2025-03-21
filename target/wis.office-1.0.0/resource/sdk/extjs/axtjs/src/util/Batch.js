/**
 * 
 * 자바스크립트의 비동기방식 코드들을 동기화 한것같은 효과를 주는 클래스.<br/>
 * 콜백안에 콜백이 들어가듯이 여러개의 콜백이 중첩됐을때 순차적으로 콜백하게 해준다.
 * 
 * ## 실행예제
 *     
 *     // batch클래스 생성
 *     var batch = Axt.util.Batch.getInstance();
 *     
 *     // batch.add로 batch function을 추가한다
 *     // 각 batch가 끝난후에는 batch.next()를 반드시 해줘야 한다.
 *     for(var i=0; i<3; i++) {
 *         batch.add(function(){
 *             // 출력 호출
 *             resource.loadPrint({
 *                 preview : false,
 *                 printerName : 'SINDOH D400 Series PCL SP',
 *                 params  : { inv_no : select[0].get('inv_no') },
 *                 requrl  : {
 *                     search : _global.api_host_info + '/' + _global.api_path +'/sale/deliveryclose/get/printing.do',
 *                 },
 *                 callback : function (success, msg) {
 *                     // next()를 실행해줘야 순차적으로 실행된다.
 *                     if(success){
 *                         batch.next();
 *                     } else {
 *                         Ext.Msg.alert('', '프린트 실패!');
 *                     }
 *                 }
 *             });
 *         });
 *     }
 * 		
 *     // 여기서 출력 시작!
 *     batch.run({
 *     	   enableLoadMask : true,
 *         maskMsg : '출력중입니다... ($count/$total)', // msg format
 *         callback : function () {                   // 모든 batch작업 끝난후 마지막 콜백
 *             Ext.Msg.alert('', '출력이 완료 되었습니다.');
 *         }
 *     });
 *     
 *     // 또는 아래와같이 run메서드 실행시에 batch를 지정할 수도 있다.
 *     batch.run({
 *         enableLoadMask : true,
 *         maskMsg : '출력중입니다... ($count/$total)', // msg format (maskMsg를 지정해주지 않으면 LoadMask가 뜨지 않는다 옆의 count/total은 진행상황을 나타낸다.)
 *         batch   : [
 *             function(){
 *                 Ext.Msg.alert('', 'step1');
 *                 batch.next();
 *             },
 *             function(){
 *                 Ext.Msg.alert('', 'step2');
 *                 batch.next();
 *             }
 *         ],
 *         callback : function () {                   // 모든 batch작업 끝난후 마지막 콜백
 *             Ext.Msg.alert('', '출력이 완료 되었습니다.');
 *         }
 *     });
 *     
 *     
 * 만약 이 batch 클래스를 사용하지 않고 일반적으로 코딩한다면 아래와 같이 된다.
 * 한두개일때는 큰상관이 없을수도있지만
 * 콜백안에 여러콜백이 중첩되고 다른 코드들이 같이 포함되어있다면 가독성이 나빠지게 된다.
 *     var test1Store = Ext.getStore('test1Store');
 *     var test2Store = Ext.getStore('test2Store');
 *     var test3Store = Ext.getStore('test2Store');
 *     test1Store({
 *	        callback : function(){
 *	            test2Store({
 *	     	       callback : function(){
 *				       test2Store({
 *	    	               callback : function(){
 *	                       }
 *	                   });
 *	               }
 *	           });
 *	        }
 *     });   
 *  
 */
Ext.define('Axt.util.Batch', {
    singleton: true,
    getInstance : function() {
    	return {
    		index : -1,
        	totalCount : 0,
        	enableLoadMask:false,
        	maskMsg : null,
        	batchArray : [],
        	callback : null,
        	data : null,
        	me : null,
        	
    	    /**
    	     * Batch실행
    	     * 
    	     * @param {Object} config 설정정보
    	     */
    	    run : function (config) {
    	    	var me = this;
    	    	if(config) {
    	    		if(config.callback) {
    	    			me.callback = (config.callback);
    	    		}
    	    		if(config.maskMsg) {
    	    			me.maskMsg = (config.maskMsg);
    	    		}
    	    		if(config.batch) {
    	    			me.totalCount = (config.batch.length);
    	    			me.batchArray = (config.batch);
    	    		}
    	    		if(config.enableLoadMask) {
    	    			me.enableLoadMask = (config.enableLoadMask);
    	    		}
    	    		
    	    	}
    	    	
    	    	me.viewMask();
    	    	me.next();
    	    },
    	    
    	    /**
    	     * batch function 추가
    	     * 
    	     * @param {Function} func batch함수
    	     */
    	    add : function (func) {
    	    	var me = this;
    	    	me.totalCount = (me.totalCount + 1);
    	    	me.batchArray.push(func);
    	    },
    	    
    	    /**
    	     * batch의 다음 실행
    	     */
    	    next : function () {
    	    	var me = this;
    	    	
    	    	// 모든 callback 호출이 끝났을때
    			if(me.batchArray.length === 0) {
    	    		
    				if(me.enableLoadMask) {
    					Ext.MessageBox.hide();
    				}
    				
    	    		if(typeof me.callback === 'function') {
    	    			var args = [];
    	        		for(var i=0; i<arguments.length; i++) {
    	        			args.push(arguments[i]);
    	        		}
    	        		me.callback.apply(me, args);
    	    		}
    				//me.destroy();
    				return;
    			}
    	    	
    	    	var func = me.batchArray.shift();
    	    	if(func){
    	    		var args = [];
    	    		for(var i=0; i<arguments.length; i++) {
    	    			args.push(arguments[i]);
    	    		}
    	    		args.push(me);
    	    		me.index = (me.index + 1);
    	    		me.updateMask();
    				func.apply(me, args);
    	    	}
    	    },
    	    
    	    /**
    	     * @private
    	     * loadMask실행
    	     */
    	    viewMask : function () {
    	    	var me = this;
    	    	if(me.enableLoadMask) {
//    				var count = (me.index + 1);
//    				var total = me.totalCount;
//    				var msg = (me.maskMsg||'처리중 입니다... ($count/$total)').replace(/\$count/g, count).replace(/\$total/g, total);
    				
    	    		Ext.MessageBox.show({
    		  	    	 title: '잠시만 기다려 주십시오.',
    		  	    	 progressText : 'Initializing...',
    		  	    	 width: 300,
    		  	    	 progress: true,
    		  	    	 closable: false,
    		      	});
    	    		
    	    	}
    	    },
    	    
    	    updateMask : function () {
    	    	var me = this;
    	    	if(me.enableLoadMask) {
    	    		
    	    		var count = (me.index+1);
    	    		var total = me.totalCount;
    	    		var msg = (me.maskMsg||'처리중 입니다... ($count/$total)').replace(/\$count/g, count).replace(/\$total/g, total);
    	    		
    	    		Ext.MessageBox.updateProgress(count/total, msg);
    	    	}
    	    }
    	};
    }
    
});


