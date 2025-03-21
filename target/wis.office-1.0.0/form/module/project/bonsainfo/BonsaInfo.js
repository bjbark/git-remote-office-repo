Ext.define('module.project.bonsainfo.BonsaInfo', { extend:'Axt.app.Controller',

	requires: [
	 	'lookup.upload.FileUpload',
	 	'lookup.popup.project.BonsaPopup'
	],
	models:['module.project.bonsainfo.model.BonsaInfo'],
	stores:['module.project.bonsainfo.store.BonsaInfo'],
	views:[
	       'module.project.bonsainfo.view.BonsaInfoLayout',
	       'module.project.bonsainfo.view.BonsaInfoSearch',
	       'module.project.bonsainfo.view.BonsaInfoLister',
	       'module.project.bonsainfo.view.BonsaInfoEditor'
	],
    initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission( workspace.down('[action=synchronizer]') , Const.PERMIT.MODIFY );
		this.joinPermission( workspace.down('[action=convertstore]') , Const.PERMIT.MODIFY );
	},
	init: function() {
		var me = this;
		// 사용자타입에 따라 searchAction()이 유동적으로 움직여야 할 때 사용 >> 현재는 autoLoad 사용
		me.control({
			// layout event
			'module-bonsainfo-layout button[action=selectAction]' : { click : me.selectAction }, // 조회
			// editer event
			'module-bonsainfo-editor button[action=uploadAction]' : { click : me.uploadAction },
			'module-bonsainfo-editor button[action=synchronizer]' : { click : me.synchronizer }, // 싱크


			'module-bonsainfo-editor button[action=updateAction]' : { click : me.updateAction }, // 저장
			'module-bonsainfo-editor button[action=cancelAction]' : { click : me.cancelAction }, // 취소
			// lister event
			'module-bonsainfo-lister button[action=insertAction]' : { click : me.insertAction }, /* 등록 */
			'module-bonsainfo-lister button[action=modifyAction]' : { click : me.modifyAction }, /* 수정 */
			'module-bonsainfo-lister button[action=exportAction]' : { click : me.exportAction }, /* 엑셀 */


			// lister event
			'module-bonsainfo-lister' : {
				selectionchange: me.selectRecord,  // 메뉴 선택시 이벤트
				itemcontextmenu: me.contextEvent
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-bonsainfo-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-bonsainfo-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-bonsainfo-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-bonsainfo-lister')[0] }
	},

	/**
	 * 조회
	 */
	selectAction:function() {
		var me     = this,
			lister = me.pocket.lister()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		console.debug(lister);
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);}
				mask.hide();
			}, scope:me
		}, Ext.merge( me.pocket.search().getValues(), {} ));
	},


	/**
	 * 선택
	 */
	selectRecord:function( grid, record ){
		var me = this, editor = me.pocket.editor();
		editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);
	},

	/**
	 * 수정
	 */
	modifyAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.modifyRecord({
			caller   : me,
			callback : function( results ) {
				if (results.success){
					results.feedback({success : true, visible : true }); // , visible : true
				}
			}
		});
	},

	/**
	 * 저장
	 */
	updateAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.updateRecord({
			lister : me.pocket.lister(),
			callback : function(results, record, store ) {
				if (results.success) {
					store.sync({
						success : function(operation){
							record.set('reinitial', '0');
							store.commitChanges();
							results.feedback({success : true , visible : false}); //, visible : true
						}, // 저장 성공시
						failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
						callback: function(operation){ results.callback({}); } // 성공 실패 관계 없이 호출된다.
					});
				}
			}
		}, me);
	},

	/**
	* 취소
	*/
	cancelAction:function() {
		var me = this,
			editor = me.pocket.editor()
		;
		editor.cancelRecord({
			caller   : me,
			action   : Const.EDITOR.DEFAULT ,
			callback : function(results, record){
				if (results.success){
					results.feedback( {success : true , reload : true });
				}
			},
			finished : function(results, record){
				if (results.success){
					editor.collapse(false);
				}
			}
		});
	},


	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	},

	contextEvent : function(view,record,item,index,e) {
		var me = this ,
			lister = view.ownerCt
		;
		e.stopEvent();
		if (!lister.ctxMenu) {
			lister.ctxMenu = new Ext.menu.Menu({
				items : [
				 	{	text: '로고 이미지 등록',
				 		iconCls: Const.INSERT.icon,
				 		handler: function() {
				 			var select = lister.getSelectionModel().getSelection()[0];
				 	 		if (select){
				 	 			if (Ext.isEmpty(select.get('img_ddns'))){
				 	 				Ext.Msg.show({ msg: '이미지 서버 설정후 사용하시기 바랍니다.' , buttons: Ext.Msg.YES, icon: Ext.Msg.ERROR });
				 	 				return;
				 	 			}
				 	 			resource.loadPopup({
				 	 				widget : 'lookup-file-upload',
				 	 				params : {
				 	 					hq_id : select.get('hq_id'),
				 	 					img_ddns : select.get('img_ddns'),
				 	 					pos_ddns : select.get('pos_ddns')
				 	 				},
				 	 				apiurl : {
				 	 					upload : _global.location.href + '/control/contr/bonsainfo/set/upload.do',
				 	 				},
				 	 				option : {
				 	 					title     : '로고 이미지 업로드',
				 	 					waitMsg   : '업로드중...',
				 	 					extension : ['jpg', 'png', 'gif'],
				 	 					labelConfig    : {  text:'업로드할 파일을 선택 하여 주시기 바랍니다. [190*45] 사이즈만 가능 합니다.' }
				 	 				},
				 	 				result : function (records) {
				 	 					select.set('logo_url' , records[0].url );
				 	 				}
				 	 			});
				 	 		}
				 		}
				 	},{
				 		text: '로고 이미지 삭제',
				 		iconCls: Const.DELETE.icon,
				 		handler: function() {
				 			var select = lister.getSelectionModel().getSelection()[0];
				 			if (select){
				 	 			if (Ext.isEmpty(select.get('img_ddns'))){
				 	 				Ext.Msg.show({ msg: '이미지 서버 설정후 사용하시기 바랍니다.' , buttons: Ext.Msg.YES, icon: Ext.Msg.ERROR });
				 	 				return;
				 	 			}
				 	 			if (Ext.isEmpty(select.get('logo_url'))){
				 	 				Ext.Msg.show({ msg: '삭제할 로고 이미지 정보가 없습니다.' , buttons: Ext.Msg.YES, icon: Ext.Msg.ERROR });
				 	 				return;
				 	 			}

				 	 	 		Ext.Msg.show({ title: '삭제 확인 요청', msg: '로고 이미지를 삭제 하시겟습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				 	 	 			fn : function (button) {
				 	 	 				if (button==='yes') {
							 	 			Ext.Ajax.request({
							 	 	    		url    : _global.location.href + '/control/contr/bonsainfo/del/upload.do',
							 	 	    		params : {
							 	 	    			token : _global.token_id,
							 	 	    			param : JSON.stringify({
							 	 	    				hq_id : select.get('hq_id'),
							 	 	    				img_ddns : select.get('img_ddns'),
							 	 	    				pos_ddns : select.get('pos_ddns')
							 	 	    			})
							 	 	    		},
							 	 	    		method : 'POST',
							 	 	    		success:function(response){
							 	 	    			var result = Ext.decode(response.responseText);
							 	 	    			if (result.success) {
							 	 	    				select.set('logo_url' , '' );
							 	 	    			}
							 	 				},
							 	 				failure:function(result, request){
								 	 				Ext.Msg.show({ msg: '로고 이미지 삭제 실패 하였습니다.' , buttons: Ext.Msg.YES, icon: Ext.Msg.ERROR });
							 	 				}
							 	 	    	});
				 	 	 				}
				 	 	 			}
				 	 	 		});
				 			}
					 	}
				 	}
				 	,'-',
				 	{
				 		text: '최종 매출일 수신',
				 		iconCls: Const.INSERT.icon,
				 		handler: function() {
				 			var select = lister.getSelectionModel().getSelection()[0];
				 	 		if (select){
				 	 			if (Ext.isEmpty(select.get('pos_ddns'))){
				 	 				Ext.Msg.show({ msg: '오라클 서버 설정후 사용하시기 바랍니다.' , buttons: Ext.Msg.YES, icon: Ext.Msg.ERROR });
				 	 				return;
				 	 			}
				 	 			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
				 	 			mask.show();
				 	 			Ext.Ajax.request({
				 	 	    		url    : _global.location.href + '/control/contr/bonsainfo/get/lastsales.do',
				 	 	    		timeout: 60000,
				 	 	    		params : {
				 	 	    			token : _global.token_id,
				 	 	    			param : JSON.stringify({
				 	 	    				hq_id : select.get('hq_id'),
				 	 	    				pos_ddns : select.get('pos_ddns')
				 	 	    			})
				 	 	    		},
				 	 	    		method : 'POST',
				 	 	    		success:function(response){
				 	 	    			var result = Ext.decode(response.responseText);
				 	 	    			if (result.success) {
						 	 				Ext.Msg.show({ msg: '최종 매출일 수신 완료' , buttons: Ext.Msg.YES, icon: Ext.Msg.INFORMATION });
				 	 	    			}
				 	 				},
				 	 				failure:function(result, request){
					 	 				Ext.Msg.show({ msg: '최종 매출일 수신에 실패 하였습니다.' , buttons: Ext.Msg.YES, icon: Ext.Msg.ERROR });
				 	 				},
				 	 				callback: function(operation){
				 	 					mask.hide();
				 	 				}
				 	 	    	});
				 	 		}
				 		}
				 	}



				]
        	 });
         }
         lister.ctxMenu.showAt(e.getXY());
      },



	/**
	 * 싱크
	 */
	synchronizer :function() {
		var me = this, editor = me.pocket.editor();
		var record = editor.getRecord();
		if (record && record.get('hq_ver') === 'N'){
			Ext.Msg.show({
				msg: record.get('hq_nm') + "서버와 동기화를 진행 하시겟습니까?" , buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button === 'yes'){
						record.set('reinitial', '1');
						me.updateAction();
					}
				}
			});
		} else {
			Ext.Msg.show({ msg: '동기화를 할수 없습니다.', buttons: Ext.Msg.YES, icon: Ext.Msg.ERROR });
		}
	}



});


