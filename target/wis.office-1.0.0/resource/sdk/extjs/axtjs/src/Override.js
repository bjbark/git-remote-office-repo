
/* 삭제 예정 */
//
//Ext.require('Ext.util.Format', function() {
//	Ext.apply(Ext.util.Format, {
//		intToBool : function(v) {
//			return ( v == 1 ) ? true : false;
//		},
//		boolToInt : function(v) {
//			return ( v == 1 ) ? 1 : 0;
//		},
//		strToDate: function(val){
//			if(!val){
//				return
//			}
//			var regExp8 = /^([0-9]{8})/g;
//			var regExp6 = /^([0-9]{6})/g;
//			if (regExp8.test(val)){
//				return val.substring(0,4) + '-' + val.substring(4,6) + '-' +val.substring(6);
//			}else 
//			if (regExp6.test(val)){
//				return val.substring(0,4) + '-' + val.substring(4);
//			}else 
//			if (val.getMonth) {
//				return Ext.util.Format.date(val, 'Y-m-d');
//			}
//			return val;
//		},
//		dateToStr: function(val){
//			if (!val) {
//				return '';
//			}
//			if (val.getMonth) {
//				return Ext.util.Format.date(val, 'Ymd');
//			} else {
//				return val.split('-').join('');
//			}
//		},
//		strToTime: function(val){
//			if (!val){
//				return
//			}
//			var regExp4 = /^([0-9]{4})/g;
//			if (regExp4.test(val)){
//				return val.substring(0,2) + ':' + val.substring(2,4);
//			}
//			return val;
//		},		
//		timeToStr: function(val){
//			if (!val) {
//				return '';
//			} else {
//				return val.split(':').join('');
//			}
//		}
//	});
//});

//
//Ext.require('Ext.form.VTypes', function() {
//    Ext.apply(Ext.form.VTypes, {
//        'emailText' : '이메일 형식으로만 입력이 가능합니다.</br> ex) test@test.com',
//
//        'phoneText': '전화 Not a valid phone number. Must be in the format (123) 456-7890.',
//        'phoneMask': /[\-\+0-9\(\)\s\.Ext]/,
//        'phoneRe': /^(\({1}[0-9]{3}\){1}\s{1})([0-9]{3}[-]{1}[0-9]{4})$|^(((\+44)? ?(\(0\))? ?)|(0))( ?[0-9]{3,4}){3}$|^Ext. [0-9]+$/,
//        'phone': function (v) {
//    		return this.phoneRe.test(v);
//    	},
//        
//    	'numberText': '숫자만 입력이 가능 합니다.',
//    	'numberMask': /^\d+$/,
//    	'numberRe': /^\d+$/,
//    	'number': function (v) {	
//    		return this.numberRe.test(v);
//    	}
//	});
//});
//
//Ext.require( 'Ext.data.writer.Json', function() {
//	Ext.data.writer.Json.override({
//		getRecordData: function(record) {
//
//			var me = this,
//				i,
//				association,
//				childStore ,
//				data = {}  ,
//				datas = [] ,
//				toInsert, toUpdate, toDelete
//			;
//
//			data = me.callParent([record]);
//			for (i = 0; i < record.associations.length; i++) {
//				association = record.associations.get(i);
//				if (association.type == 'hasMany')  {
//					data[association.name] = [];
//					childStore = eval('record.'+association.name+'()');
//					toInsert = childStore.getNewRecords(), toUpdate = childStore.getUpdatedRecords(), toDelete = childStore.getRemovedRecords();
//					if (toDelete.length > 0) { Ext.each(toDelete, function( record ) { record.set('_set','delete'); data[association.name].push( me.getRecordData.call(me, record ))});}
//					if (toInsert.length > 0) { Ext.each(toInsert, function( record ) { record.set('_set','insert'); data[association.name].push( me.getRecordData.call(me, record ))});}
//					if (toUpdate.length > 0) { Ext.each(toUpdate, function( record ) { record.set('_set','update'); data[association.name].push( me.getRecordData.call(me, record ))});}
//				}
//			}
//			return data;
//		}
//	});
//});


//
//Ext.onReady(function() {
//	/**
//	 * Controller에 설정 된 이벤트 제거
//	 */
//	Ext.override(Ext.app.EventBus, {
//		uncontrol: function(controllerArray) {
//			var me = this, bus = me.bus, deleteThis, idx;
//
//			Ext.iterate(bus, function(ev, controllers) {
//				Ext.iterate(controllers, function(query, controller) {
//					deleteThis = false;
//
//					Ext.iterate(controller, function(controlName) {
//						idx = controllerArray.indexOf(controlName);
//
//						if (idx >= 0) {
//							deleteThis = true;
//						}
//					});
//
//					if (deleteThis) {
//						delete controllers[query];
//					}
//				});
//			});
//		}
//	});
//});
