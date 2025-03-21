Ext.define('module.close.monthlyclose.MonthlyClose', { extend : 'Axt.app.Controller',

	models:
	[
	 	'module.close.monthlyclose.model.MonthlyClose'
	],
	stores:
	[
	 	'module.close.monthlyclose.store.MonthlyClose'

	],
	views :
	[
	 	'module.close.monthlyclose.view.MonthlyCloseLayout',
	 	/* 현황 */
	 	'module.close.monthlyclose.view.MonthlyCloseSearch',
	    'module.close.monthlyclose.view.MonthlyCloseLister'

	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-monthlyclose-layout button[action=selectAction]'        : { click : me.selectAction }, /* 조회 */
			'module-monthlyclose-lister button[action=exportAction]' : { click : me.exportAction }, /* 엑셀 */
			'module-monthlyclose-lister' : {
				itemdblclick    : me.selectDetail
			},
			'module-monthlyclose-lister button[action=updateAction]' : { click : me.updateAction }  /* 저장 */
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-monthlyclose-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-monthlyclose-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-monthlyclose-lister')[0] }
	},

	selectAction:function(callbackFn) {
		var me = this,
			lister = me.pocket.lister()
		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
		mask.show();
		lister.select({
			 callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true); }
				mask.hide();
			}, scope:me
		}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
	},


	updateAction:function() {
		var me = this,
			lister   = me.pocket.lister(),
			selects  = lister.getSelectionModel().getSelection(),
			close_gb = lister.down('[name=close_gb]').getValue(),
			trmn_dt = lister.down('[name=trmn_dt]').getValue()
		;

		if (trmn_dt == undefined) {
			Ext.Msg.alert("알림", "마감일자를 입력하여 주시기 바랍니다.");
			return;
		}

		if (selects.length == 0) {
			Ext.Msg.alert("알림", "마감할 사업장을 선택해 주시기 바랍니다.");
			return;
		} else {
			Ext.Msg.show({ title: '확인', msg: '마감하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {

						var mask = new Ext.LoadMask(Ext.getBody(), {msg: '마감 하는중 입니다.' });
						mask.show();
						setTimeout(function(){
							Ext.each(selects, function(record, index){
								Ext.Ajax.request({
									async  : false ,
									url    : _global.api_host_info + '/system/close/monthlyclose/set/closer.do' ,
									method : 'POST',
									params : {
										token : _global.token_id,
										param : JSON.stringify( {
											stor_id : record.get('stor_id'),
											close_gb : close_gb ,
											trmn_dt : Ext.Date.format( trmn_dt , 'Ym')
										})
									},
									success:function(response){
										switch (close_gb) {
											case '2072101' : record.set('itm_month_ym' , trmn_dt ); break;
											case '2072301' : record.set('cust_month_ym' , trmn_dt ); break;
											case '2072401' : record.set('vend_month_ym' , trmn_dt ); break;
										}
									},
									failure:function(result, request){
									}
								});
							});
							mask.hide();
						}, 1000);
					}
				}
	 		});
		}
	},



	/**
	* 엑셀
	*/
	exportAction : function(self) {
		this.pocket.lister().writer({enableLoadMask:true});
	}
});



