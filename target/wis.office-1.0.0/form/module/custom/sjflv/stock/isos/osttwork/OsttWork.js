Ext.define('module.custom.sjflv.stock.isos.osttwork.OsttWork', { extend:'Axt.app.Controller',

	requires : [
		'Axt.popup.view.ZipcodeSearch',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ItemClassPopup'
	],
	models : [
	    'module.custom.sjflv.stock.isos.osttwork.model.OsttWork',
	    'module.custom.sjflv.stock.isos.osttwork.model.OsttWork2',
	    'module.custom.sjflv.stock.isos.osttwork.model.OsttWorkLabelPopup'
	],
	stores : [
	    'module.custom.sjflv.stock.isos.osttwork.store.OsttWork',
	    'module.custom.sjflv.stock.isos.osttwork.store.OsttWork2',
	    'module.custom.sjflv.stock.isos.osttwork.store.OsttWorkLabelPopup'
	],
	views : [
		'module.custom.sjflv.stock.isos.osttwork.view.OsttWorkLayout',
		'module.custom.sjflv.stock.isos.osttwork.view.OsttWorkSearch',
		'module.custom.sjflv.stock.isos.osttwork.view.OsttWorkLister',
		'module.custom.sjflv.stock.isos.osttwork.view.OsttWorkLister2',
		'module.custom.sjflv.stock.isos.osttwork.view.OsttWorkEditor',
		'module.custom.sjflv.stock.isos.osttwork.view.OsttWorkLabelPopup'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event.
			'module-osttwork-layout #mainpanel'					 : { tabchange : me.selectAction	},
			'module-osttwork-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer event
			'module-osttwork-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-osttwork-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister event
			'module-osttwork-lister button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-osttwork-lister button[action=insertAction]' : { click : me.insertAction },	// 신규
			'module-osttwork-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-osttwork-lister button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			// lister event//
			'module-osttwork-lister' : {
				selectionchange: me.attachRecord 											// 메뉴 선택시 이벤트
			},

			'module-osttwork-lister2 button[action=boxlabelAction]'	: { click : me.boxlabelAction},	// 박스라벨발행
		});
		me.callParent(arguments);
	},

	pocket : {
		layout  : function () { return Ext.ComponentQuery.query('module-osttwork-layout')[0] },
		search  : function () { return Ext.ComponentQuery.query('module-osttwork-search')[0] },
		editor  : function () { return Ext.ComponentQuery.query('module-osttwork-editor')[0] },
		lister  : function () { return Ext.ComponentQuery.query('module-osttwork-lister')[0] },
		lister2 : function () { return Ext.ComponentQuery.query('module-osttwork-lister2')[0] },
	},

	//조회//
	selectAction : function() {
		var me = this,
			lister  = me.pocket.lister(),
			lister2 = me.pocket.lister2(),
			search  = me.pocket.search(),
			param   = search.getValues(),
			tpanel  = me.pocket.layout().down('#mainpanel'),
			tindex  = tpanel.items.indexOf(tpanel.getActiveTab())
		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		if (tindex == 0) {
			me.pocket.layout().down('#editor').show();
			search.down('[name=invc1_date]').hide();
			search.down('[name=invc2_date]').hide();

			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		} else if(tindex == 1) {
			me.pocket.layout().down('#editor').hide();
			search.down('[name=invc1_date]').show();
			search.down('[name=invc2_date]').show();

			lister2.select({
				callback:function(records, operation, success) {
					if (success) {
						lister2.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},

	attachRecord:function( smodel, record ){
		var me     = this,
			editor = me.pocket.editor(),
			lister = smodel ? smodel.view.ownerCt : me.pocket.lister()
		;
		editor.attachRecord({
			caller : me ,
			lister : lister ,
			record : record ? record : lister.getSelectionModel().getSelection()
		});
	},

	//수정
	modifyAction : function() {
		var me = this,
			editor = me.pocket.editor(),
			search = me.pocket.search(),
			select = me.pocket.lister().getSelectionModel().getSelection()[0]

		editor.down('[itemId=update]').show();
		editor.down('[itemId=cancel]').show();

		editor.down('[name=item_name]').setReadOnly(true);
		editor.down('[name=item_code]').setReadOnly(true);
		editor.down('[name=item_spec]').setReadOnly(true);
		editor.down('[name=cstm_name]').setReadOnly(true);
		editor.down('[name=cstm_code]').setReadOnly(true);

		if(!select){
			Ext.Msg.alert("알림","수정할 데이터를 선택하여주십시오.");
		}editor.modifyRecord({
			caller   : me,
			action   : Const.EDITOR.DEFAULT ,
			callback : function( results ) {
				if (results.success){
					results.feedback({success : true});
				}
			},
			finished : function(results, record){
				if (results.success){
					editor.expand(false);
					me.pocket.layout().down('#mainpanel').setDisabled(true);
					me.pocket.search().setDisabled(true);
				}
			}
		});
	},

	//신규
	insertAction : function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			search = me.pocket.search()
			param = search.getValues()
		;
		editor.down('[itemId=update]').show();
		editor.down('[itemId=cancel]').show();

		editor.down('[name=item_name]').setReadOnly(false);
		editor.down('[name=item_code]').setReadOnly(false);
		editor.down('[name=item_spec]').setReadOnly(false);
		editor.down('[name=cstm_name]').setReadOnly(false);
		editor.down('[name=cstm_code]').setReadOnly(false);

		editor.insertRecord({
			action : Const.EDITOR.DEFAULT,
			record : Ext.create( lister.getStore().model.modelName,{
				drtr_idcd : _global.login_pk,
				drtr_name : _global.login_nm,
				item_idcd : '-'
			}),
			disables : [ me.pocket.layout().down('#mainpanel'), me.pocket.search().setDisabled(true)],
			callback: function (results){
				if (results.success) {
					setTimeout(function(){

					},200);
					results.feedback({success : true });
				}
			},
			finished : function(results, record){
				if (results.success){
					editor.expand(false);
				}
			}
		})
	},

	//저장
	updateAction : function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			store  = lister.getStore()
		;

		editor.down('[itemId=update]').hide();
		editor.down('[itemId=cancel]').hide();

		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
			callback : function(results, record ) {
				if (results.success) {
					store.sync({
						success : function(operation){ results.feedback({success : true  });},
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					});
				}
			},
			finished : function(results, record, operation){
				if (results.success){
					me.pocket.layout().down('#mainpanel').setDisabled(false);
					me.pocket.search().setDisabled(false);
					editor.collapse(false);
					switch (operation) {
						case Const.EDITOR.PROCESS.INSERT : lister.getSelectionModel().select(record ); break;
						case Const.EDITOR.PROCESS.UPDATE : me.attachRecord(lister, record );           break;
					}
				}
			}
		});
	},

	//취소
	cancelAction : function() {
		var me = this, editor = me.pocket.editor();

		editor.down('[itemId=update]').hide();
		editor.down('[itemId=cancel]').hide();

		editor.cancelRecord({
			caller : me,
			lister : me.pocket.lister(),
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectRecord : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false)
			}
		}, me);
	},

	//삭제
	deleteAction : function() {
		var me = this,
		editor = me.pocket.editor();
		editor.deleteRecord({
			lister	: me.pocket.lister(),
			callback: function(results, record, store) {
				store.sync({																					// 저장 성공시
					success : function(operation){ results.feedback({success : true , visible : false });},		// 저장 성공시
					failure : function(operation){ results.feedback({success : false }); },						// 저장 실패시 호출
					callback: function(operation){ results.callback({}); }										// 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	},

	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	},

	//박스라벨발행
	boxlabelAction:function() {
		var me = this,
			master = me.pocket.lister2(),
			select = master.getSelectionModel().getSelection(),
			resId = _global.hq_id.toUpperCase()
			err_msg = ""
		;

		if (select.length > 0) {
			var item = "[";
			for(var i =0; i< select.length ; i++){
				if (select[i].get('pack_qntt') == 0) {
					err_msg = "패킹단위가 0 입니다. 패팅단위 확인 후 작업바랍니다.";
				}
				if(i > 0) {
					item += ",";
				}
				item+= '{\'invc_numb\':\''+select[i].get('invc_numb')+'\',\'line_seqn\':\''+select[i].get('line_seqn')+'\',\'pack_qntt\':\''+select[i].get('pack_qntt')+'\',\'box_weigth\':\''+select[i].get('boxx_wigt')+'\'}';
			}
			item+= "]";

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}

			resource.loadPopup({
				widget	: 'module-osttwork-label-popup',
				params :	{
					records	 : item
				},
			})
		} else {
			Ext.Msg.alert('알림','라밸발행 품목을 선택해주세요.');
		}
	},
});