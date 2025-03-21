Ext.define('module.qc.insp.inspentry2.InspEntry2', { extend:'Axt.app.Controller',

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
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.OrdrPopup',
		'module.qc.insp.inspentry2.view.InspTypeItemPopup'
	],

	models:[
		'module.qc.insp.inspentry2.model.InspEntry2Master',
		'module.qc.insp.inspentry2.model.InspEntry2Lister1'
	],
	stores:[
		'module.qc.insp.inspentry2.store.InspEntry2Master',
		'module.qc.insp.inspentry2.store.InspEntry2Lister1'
	],
	views:
	[
		'module.qc.insp.inspentry2.view.InspEntry2Layout',
		'module.qc.insp.inspentry2.view.InspEntry2Search',
		'module.qc.insp.inspentry2.view.InspEntry2Master',
		'module.qc.insp.inspentry2.view.InspEntry2Lister1'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-inspentry2-layout button[action=selectAction]'  : { click : me.selectAction },	// 조회
			// editer event
//			'module-inspentry2-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
//			'module-inspentry2-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister event
			'module-inspentry2-lister button[action=exportAction]'  : { click : me.exportAction },	// 엑셀
			'module-inspentry2-lister button[action=printAction]'   : { click : me.printAction },	// 검사성적서발행
			'module-inspentry2-lister button[action=printAction2]'   : { click : me.printAction2 },	// 납품검사성적서발행
			'module-inspentry2-lister1 button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-inspentry2-lister1 button[action=deleteAction]' : { click : me.deleteAction },	// 엑셀
			'module-inspentry2-lister1 button[action=typeItem]'     : { click : me.typeItem     },	// 검사유형별 검사항목
			'module-inspentry2-lister button[action=prodInsert]'    : { click : me.prodInsert   },	// 입고확정
			// lister event
			'module-inspentry2-lister' : {
				itemdblclick    : me.selectLister,
				selectionchange : me.selectRecord
			}

		});
		me.callParent(arguments);
	},
	pocket :
		{
		layout : function () { return Ext.ComponentQuery.query('module-inspentry2-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-inspentry2-search')[0] },
		master : function () { return Ext.ComponentQuery.query('module-inspentry2-lister')[0] },
		lister1 : function () { return Ext.ComponentQuery.query('module-inspentry2-lister1')[0] },
		},


	//조회
	selectAction:function()
		{
		var me = this,
			master = me.pocket.master(),
			search = me.pocket.search(),
			param = search.getValues()
		;
		if(param.pdod_date1>param.pdod_date2){
			Ext.Msg.alert("알림","지시일자를 다시 입력해주십시오.");
		}else if(param.work_strt_dttm1>param.work_strt_dttm2){
			Ext.Msg.alert("알림","착수예정일자를 다시 입력해주십시오.");
		}else if(param.work_endd_dttm1>param.work_endd_dttm2){
			Ext.Msg.alert("알림","종료예정일자를 다시 입력해주십시오.");
		}else{
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
		}
	},

	//선택
	selectLister:function( grid, record ){
		if(record == null){
			return;
		}else{
			var me = this,
			master = me.pocket.master(),
			lister1 = me.pocket.lister1(),
			record = master.getSelectionModel().getSelection()[0]
			;
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
				mask.show();
			lister1.select({
				 callback : function(records, operation, success) {
						if (success) {
							mask.hide();
						} else {}
					}, scope : me
			}, { invc_numb : record.get('invc_numb') });
		}
	},
	selectRecord:function( grid, records ){
		var me = this,
			lister1 = me.pocket.lister1()
		;
		lister1.getStore().clearData();
		lister1.getStore().loadData([],false);
	},
	prodInsert : function() {
		var me = this,
			master = me.pocket.master(),
			select = master.getSelectionModel().getSelection()[0],
			work_date_dom = Ext.ComponentQuery.query('#work_date')[0];
			store = master.getStore();
		;
		var work_date = Ext.Date.format(work_date_dom.getValue(),'Ymd');
		if(select.get('checkprod')){
			Ext.Msg.alert("알림","이미 입고처리된 생산실적입니다.");
		}else{
			Ext.Msg.show({ title: '확인', msg: '입고를 확정하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						var record =[{
							invc_numb		: select.get('invc_numb'),
							bzpl_idcd		: select.get('bzpl_idcd'),
							work_date		: work_date,
							pdsd_numb		: select.get('pdsd_numb'),
							wkod_numb		: select.get('wkod_numb'),
							wkct_idcd		: select.get('wkct_idcd'),
							item_idcd		: select.get('item_idcd'),
							drtr_idcd		: select.get('wker_idcd'),
							prod_dept_idcd	: select.get('prod_dept_idcd'),
							lott_numb		: select.get('lott_numb'),
						}];
						Ext.Ajax.request({
							url		: _global.location.http() + '/qc/insp/inspentry2/set/masterProd.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									stor_id			: _global.stor_id,
									hqof_idcd		: _global.hqof_idcd,
									records			: record,
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
									store.reload();
								}
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							}
						});
					}else{
						return;
					}
				}
			});
		}
	},
	deleteAction:function(){
		var	me		= this,
			lister1	= me.pocket.lister1(),
			select	= lister1.getSelectionModel().getSelection()[0]
		;
		if(select){
			Ext.Msg.confirm("알림","삭제하시겠습니까?",function(button){
				if(button=='yes'){
					Ext.Ajax.request({
						url		:  _global.location.http() + '/qc/insp/inspentry2/set/delete.do',
						params	: {
							token : _global.token_id,
							param : JSON.stringify({
								stor_id		: _global.stor_id,
								hqof_idcd	: _global.hqof_idcd,
								invc_numb	: select.get('invc_numb'),
								line_seqn	: select.get('line_seqn'),
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
								lister1.getStore().reload();
								console.log('완료');
							}
						},
						failure : function(result, request) {
						},
						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						}
					});
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
			Ext.Ajax.request({
				url		:  _global.location.http() + '/qc/insp/inspentry2/get/wkct_invc_numb.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id		: _global.stor_id,
						hqof_idcd	: _global.hqof_idcd,
						wkod_numb	: masterselect.get('invc_numb'),
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
						if(result.records.length){
							invc_numb = result.records[0].invc_numb;
						}
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
			if(invc_numb){
			}else{
				Ext.Ajax.request({
					url		:  _global.location.http() + '/listener/seq/maxid.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							stor_id		: _global.stor_id,
							table_nm	: 'wkct_insp'
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
							invc_numb = result.records[0].seq;
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				});
			}
			resource.loadPopup({
				widget : 'module-inspentry2-insptypeitem',
				params : {
					insp_type_idcd	: masterselect.get('insp_type_idcd'),
					insp_type_name	: masterselect.get('insp_type_name'),
					wkod_numb		: masterselect.get('invc_numb')		,
					invc_numb		: invc_numb							,
					pdod_date		: masterselect.get('pdod_date'),
					indn_qntt		: masterselect.get('indn_qntt'),
					item_idcd		: masterselect.get('item_idcd'),
					item_name		: masterselect.get('item_name')
				},
				result : function (records) {
 					lister.getStore().reload();
 				}
			})
		}else{
			Ext.Msg.alert("알림","생산지시를 선택해주세요.");
		}
	},

	// 검사성적서 발행
	printAction:function() {
		var me = this,
		master = me.pocket.master(),
			select = me.pocket.master().getSelectionModel().getSelection(),
			jrf = 'NboltInspCheck.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "생산지시리스트에서 선택하여주십시오.");
			return;
		}

		if (select) {
			var invc_numb = select[0].get('invc_numb');
			var arg =	'invc_numb~'+invc_numb+'~';
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800'),
			});
		}
	},

	// 검사성적서 발행
	printAction2:function() {
		var me = this,
		master = me.pocket.master(),
			select = me.pocket.master().getSelectionModel().getSelection(),
			jrf = 'NboltInspCheck2.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "생산지시리스트에서 선택하여주십시오.");
			return;
		}

		if (select) {
			var invc_numb = select[0].get('invc_numb');
			var arg =	'invc_numb~'+invc_numb+'~';
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800'),
			});
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
