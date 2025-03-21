Ext.define('module.sale.saleplan.view.SalePlanAddPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-saleplan-addpopup',

	title		: '영업담당자 추가',
	closable	: true,
	autoShow	: true,
	width		: 280 ,
	height		: 180,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);
	},

	/**
	 * 화면폼
	 */
	createForm: function() {
		var me = this,
		form = {
			xtype		: 'form-panel',
			region		: 'center',
			border		: false,
			dockedItems	: [
				{	xtype : 'toolbar',
					dock  : 'bottom',
					items : [
						'->' ,
						{ xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
					]
				}
			],
			items : [me.editorForm() ]
		};
		return form;
	},

	editorForm : function () {
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			itemId	: 'invc',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 370,
							margin		: '20 0 0 10',
							fieldDefaults: { width : 300, labelWidth : 50, labelSeparator : '' },
							items		: [
								{	layout	: 'hbox',
									border	: 0,
									margin	: '0 0 5 0',
									items:[
										{	fieldLabel	: Language.get('plan_year','년도'),
											xtype		: 'monthfield',
											name		: 'plan_year',
											fieldCls	: 'requiredindex',
											format		: 'Y'+'년',
											submitFormat: 'Y',
											width		: 130,
											value		: (me.popup.params.plan_year?new Date(me.popup.params.plan_year):'')
										},{	fieldLabel	: '구분',
											xtype		: 'lookupfield',
											name		: 'sale_plan_dvcd',
											fieldCls	: 'requiredindex',
											editable	: false,
											lookupValue	: resource.lookup( 'sale_plan_dvcd' ),
											width		: 110,
											labelWidth	: 30,
											value		: me.popup.params.sale_plan_dvcd
										}
									]
								},{	layout	: 'hbox',
									border	: 0,
									margin	: '0 0 5 0',
									items:[
										{	fieldLabel	: '담당자',
											xtype		: 'popupfield',
											name		: 'drtr_name',
											pair		: 'drtr_idcd',
											width		: 240,
											clearable	: false ,
											popup : {
												select : 'SINGLE',
												widget : 'lookup-user-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0'  },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('user_name'));
													pairField.setValue(records[0].get('user_idcd'));
												}
											}
										},{	xtype : 'hiddenfield', name:'drtr_idcd'
										},
									]
								},{	fieldLabel	: '상호',
									xtype		: 'popupfield',
									name		: 'cstm_name',
									pair		: 'cstm_idcd',
									width		: 240,
									clearable	: false ,
									popup : {
										select : 'SINGLE',
										widget : 'lookup-cstm-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0' , sale_cstm_yorn : '1' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('cstm_name'));
											pairField.setValue(records[0].get('cstm_idcd'));
										}
									}
								},{	xtype : 'hiddenfield', name:'cstm_idcd'
								}
							]
						}
					]
				}
			]
		};
		return form;
	},

	/**
	 * 확인 버튼 이벤트
	 */
	finishAction: function(){
		var me = this,
			baseform= me.down('form'),
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			lister	= Ext.ComponentQuery.query('module-saleplan-lister')[0],
			store	= lister.getStore()
		;
		if(values.plan_year==''||values.plan_year==null){
			Ext.Msg.alert("알림","년도를 선택해주십시오.");
		}else if(values.sale_plan_dvcd==''||values.sale_plan_dvcd==null){
			Ext.Msg.alert('알림','구분을 선택해주세요.');
		}else if(values.drtr_idcd==''||values.drtr_idcd==null){
			Ext.Msg.alert('알림','담당자를 선택해주세요.');
		}else if(values.cstm_idcd==''||values.cstm_idcd==null){
			Ext.Msg.alert('알림','상호를 선택해주세요.');
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });

			var chk = 0;
			Ext.Ajax.request({
				url		: _global.location.http() + '/sale/saleplan/get/drtrchk.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						plan_year		: values.plan_year,
						sale_plan_dvcd	: values.sale_plan_dvcd,
						drtr_idcd		: values.drtr_idcd,
						cstm_idcd		: values.cstm_idcd,
						crte_idcd		: _global.login_pk,
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
						if(result.records.length>0){
							chk = result.records[0].cnt;
						}
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
			if(chk == 1){
				Ext.Msg.alert('알림','이미 해당 담당자와 상호로 등록된 영업목표가 있습니다.')
				return;
			}
			mask.show();
			Ext.Ajax.request({
				url		: _global.location.http() + '/sale/saleplan/set/drtr.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						plan_year		: values.plan_year,
						sale_plan_dvcd	: values.sale_plan_dvcd,
						drtr_idcd		: values.drtr_idcd,
						drtr_name		: values.drtr_name,
						cstm_idcd		: values.cstm_idcd,
						cstm_name		: values.cstm_name,
						crte_idcd		: _global.login_pk,
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						unit_idcd		: values.unit_idcd,
						crte_idcd		: _global.login_pk
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
						me.close();
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
			mask.hide();
		}
	}
});
