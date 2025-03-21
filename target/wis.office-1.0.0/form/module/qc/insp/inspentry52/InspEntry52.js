Ext.define('module.qc.insp.inspentry52.InspEntry52', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.InspTypePopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemClassPopup',
		'lookup.popup.view.UnitPopup',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.MoldPopup',
		'module.qc.insp.inspentry52.view.InspTypeItemPopup'
	],

	models:[
		'module.qc.insp.inspentry52.model.InspEntry52Master',
		'module.qc.insp.inspentry52.model.InspEntry52Lister1'
	],
	stores:[
		'module.qc.insp.inspentry52.store.InspEntry52Master',
		'module.qc.insp.inspentry52.store.InspEntry52Lister1'
	],
	views:
	[
		'module.qc.insp.inspentry52.view.InspEntry52Layout',
		'module.qc.insp.inspentry52.view.InspEntry52Search',
		'module.qc.insp.inspentry52.view.InspEntry52Master',
		'module.qc.insp.inspentry52.view.InspEntry52Lister1'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-inspentry52-layout button[action=selectAction]'		: { click : me.selectAction },	// 조회
			// editer event
//			'module-inspentry52-editor button[action=updateAction]'		: { click : me.updateAction },	// 저장
//			'module-inspentry52-editor button[action=cancelAction]'		: { click : me.cancelAction },	// 취소
			// lister event
			'module-inspentry52-lister button[action=exportAction]'		: { click : me.exportAction },	// 엑셀
			'module-inspentry52-lister button[action=passAction]'		: { click : me.passAction   },	// 합격처리
			'module-inspentry52-lister button[action=deleteAction]'		: { click : me.deleteAction },	// 삭제
			// lister event
			'module-inspentry52-lister1 button[action=modifyAction]'	: { click : me.modifyAction },	// 수정
			'module-inspentry52-lister1 button[action=insertAction]'	: { click : me.insertAction },	// 신규
			'module-inspentry52-lister1 button[action=exportAction]'	: { click : me.exportAction },	// 엑셀
			'module-inspentry52-lister1 button[action=typeItem]'		: { click : me.typeItem     },	// 검사유형별 검사항목
			// lister event
			'module-inspentry52-lister' : {
				selectionchange   : me.selectLister,												// 메뉴 선택시 이벤트
			}
		});
		me.callParent(arguments);
	},
	pocket :
		{
		layout : function () { return Ext.ComponentQuery.query('module-inspentry52-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-inspentry52-search')[0] },
		master : function () { return Ext.ComponentQuery.query('module-inspentry52-lister')[0] },
		lister1 : function () { return Ext.ComponentQuery.query('module-inspentry52-lister1')[0] },
		},


	//조회
	selectAction:function()
		{
		var me = this,
			master = me.pocket.master(),
			search = me.pocket.search(),
			param = search.getValues()
		;
		if(param.fr_dt == null || param.fr_dt <= param.to_dt || param.fr_dt2 <= param.to_dt2){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			master.select({
				callback:function(records, operation, success) {
				if (success) {
					master.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}else{
			Ext.Msg.alert("알림", '지시일자와 납기일자를 확인해주세요');
		}

	},

	//선택
	selectLister:function( grid, record ){
		if(record[0] == null){
			return;
		}else{
			var me = this,
			master = me.pocket.master(),
			lister1 = me.pocket.lister1(),
			record = master.getSelectionModel().getSelection()[0]
			;
			lister1.select({
				 callback : function(records, operation, success) {
						if (success) {
						} else {}

					}, scope : me
			}, { invc_numb : record.get('invc_numb') });
		}
	},

	//합격처리
	passAction:function() {
		var me = this,
			select = me.pocket.master().getSelectionModel().getSelection(),
			master = me.pocket.master()
		;
		if (select.length == 0) {
			Ext.Msg.alert("알림","출고내역을 선택해주십시오.");
		}else{
			Ext.Msg.confirm("확인", "합격처리를 하시겠습니까?", function(button) {
				if (button == 'yes') {
					Ext.each(select, function(record) {
						Ext.Ajax.request({
							url		: _global.location.http() + '/qc/insp/inspentry52/set/pass.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									invc_numb		: select[0].data.invc_numb,
									invc_date		: select[0].data.invc_date,
									stor_id			: _global.stor_id,
									hqof_idcd		: _global.hqof_idcd
								})

							},
							async	: false,
							method	: 'POST',
							success	: function(response, request) {
								var result = Ext.decode(response.responseText);
								if	(!result.success ){
									Ext.Msg.error(result.message );
									return;
								} else {
								}
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							}
						});
					})
				}
			});
		}
	},

	typeItem:function(){
		var	me = this,
			master = me.pocket.master(),
			lister = me.pocket.lister1(),
			select = lister.getSelectionModel().getSelection()[0],
			masterselect = master.getSelectionModel().getSelection()[0],
			invc_numb
		;
		if(masterselect){

			if(select){
				resource.loadPopup({
					widget : 'module-inspentry52-insptypeitem',
					params : {
						invc_numb		: select.get('invc_numb'),
						orgn_seqn		: select.get('line_seqn'),
						item_name		: select.get('item_name'),
						item_idcd		: select.get('item_idcd'),
						ostt_qntt		: select.get('ostt_qntt'),						deli_date		: masterselect.get('deli_date'),
						invc_date		: masterselect.get('invc_date'),
						deli_date		: masterselect.get('deli_date'),
						indn_qntt		: select.get('trst_qntt'),
						wkct_insp_dvcd	: _global.hqof_idcd.toUpperCase()=="N1000KOMEC"?'4000':'3000'
					},
					result : function (records) {
	 					lister.getStore().reload();
	 				}
				})
			}else{
				Ext.Msg.alert("알림", "출고검사 품목을 선택해주세요.");
			}
		}else{
			Ext.Msg.alert("알림", "출고의뢰 품목을 선택해주세요.");
		}
	},

	//엑셀
	exportAction : function(record){
		var value = record.itemId;
		if(value == 'master'){
			this.pocket.master().writer({enableLoadMask:true});
		}else if(value == 'lister1'){
			this.pocket.lister1().writer({enableLoadMask:true});
		}
	}
});
