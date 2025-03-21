Ext.define('module.sale.saleplan.SalePlan', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.UnitPopup'
	],

	models : [	'module.sale.saleplan.model.SalePlan',
				'module.sale.saleplan.model.SalePlanChart',
	],

	stores : [	'module.sale.saleplan.store.SalePlan',
				'module.sale.saleplan.store.SalePlan2',
				'module.sale.saleplan.store.SalePlanChart',
	],
	views  : [	'module.sale.saleplan.view.SalePlanLayout',
				'module.sale.saleplan.view.SalePlanSearch',
				'module.sale.saleplan.view.SalePlanLister',
				'module.sale.saleplan.view.SalePlanEditor',
				'module.sale.saleplan.view.SalePlanEditorLister',
				'module.sale.saleplan.view.SalePlanChart',
				'module.sale.saleplan.view.SalePlanAddPopup',
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			'module-saleplan-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			'module-saleplan-lister button[action=insertAction]' : { click : me.insertAction },	// 추가
			'module-saleplan-lister button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			'module-saleplan-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-saleplan-lister' : {
				selectionchange    : me.selectDetail,
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-saleplan-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-saleplan-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-saleplan-lister')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-saleplan-editor')[0] },
		editorlister : function () { return Ext.ComponentQuery.query('module-saleplan-editor-lister')[0] },
		chart : function () { return Ext.ComponentQuery.query('module-saleplan-chart')[0] }
	},


	//조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			editorlister = me.pocket.editorlister(),
			search = me.pocket.search(),
			param = search.getValues()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });

		if(param.plan_year == '' || param.plan_year == null){
			Ext.Msg.alert("알림","계획년도를 선택해주세요.");
			return;
		}else if(param.sale_plan_dvcd == '' || param.sale_plan_dvcd == null){
			Ext.Msg.alert("알림","계획구분을 선택해주세요.");
			return;
		}

		mask.show();
		lister.select({
			 callback:function(records, operation, success) {
				if (success) {
					console.log(lister.getSelectionModel());
					lister.getSelectionModel().select(0);
					me.pocket.editor().getForm().reset(true);
					editorlister.getStore().clearData();
					editorlister.getStore().loadData([],false);
				} else {}
				mask.hide();
			}, scope:me
		}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
	},

	//레코드 더블클릭
	selectDetail : function(grid, records) {
		var me = this,
			editor = me.pocket.editor(),
			editorlister = me.pocket.editorlister(),
			chart = Ext.getStore('module.sale.saleplan.store.SalePlanChart'),
			search = me.pocket.search(),
			param = search.getValues(),
			record
		;
		if (records[0]) {
			record = records[0];
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();

			editorlister.select({
				callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
				},{ plan_year  : param.plan_year,
					sale_plan_dvcd : param.sale_plan_dvcd,
					cstm_idcd : record.get('cstm_idcd'),
					drtr_idcd : record.get('drtr_idcd')
				}
			);

			//더블클릭시 그 로우의 정보로만 차트 생성되게끔
			chart.load({
				params : {
					param:JSON.stringify({
						plan_year : param.plan_year,
						sale_plan_dvcd : param.sale_plan_dvcd,
						cstm_idcd : record.get('cstm_idcd'),
						drtr_idcd : record.get('drtr_idcd')
					})
				},
				callback : function(records,operation,success){
				}
			});

		}
	},
	//삭제
	deleteAction : function() {
		var me = this,
			lister = me.pocket.lister()
			select = lister.getSelectionModel().getSelection()[0],
			chart = Ext.getStore('module.sale.saleplan.store.SalePlanChart')
		;
		if(select){
			Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
				if (button == 'yes') {
					Ext.Ajax.request({
						url		: _global.location.http() + '/sale/saleplan/set/delete.do',
						params	: {
							token : _global.token_id,
							param : JSON.stringify({
								plan_year		: select.get('plan_year'),
								sale_plan_dvcd	: select.get('sale_plan_dvcd'),
								drtr_idcd		: select.get('drtr_idcd'),
								cstm_idcd		: select.get('cstm_idcd'),
								stor_id			: _global.stor_id,
								hqof_idcd		: _global.hqof_idcd,
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
								Ext.Msg.alert("알림", "삭제되었습니다.");
								lister.getStore().reload();
								chart.clearData();
								chart.loadData([],false);
							}
						},
						failure : function(result, request) {
						},
						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						}
					});
				}
			});
		}else{
			Ext.Msg.alert('알림','삭제할 영업목표를 선택해주세요.');
		}
	},
	insertAction:function(){
		var	me = this,
			search = me.pocket.search(),
			param = search.getValues()
		;
		console.log(param);
		resource.loadPopup({
			widget : 'module-saleplan-addpopup',
			params  : {sale_plan_dvcd:param.sale_plan_dvcd,plan_year:param.plan_year }
		});
	},
	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	},

});
