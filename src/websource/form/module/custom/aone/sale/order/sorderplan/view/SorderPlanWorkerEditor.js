Ext.define('module.custom.aone.sale.order.sorderplan.view.SorderPlanWorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-aone-sorderplan-worker-editor',
	height	: 280,
	layout	: {
	type	:'border'
	},

	title			: Language.get('ordr_info','입고 정보'),
//	collapsible 	: false	,
//	collapsed		: false	,
	defaultFocus	: 'invc_numb',

	initComponent: function(config){
		var me = this;		
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = [me.createTabs()];
		me.callParent(arguments)  ;
	},

	createDock : function () {
		var me = this,
			panel = me.up('form'),
			item = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
				'->', '-',
				{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' , itemId : 'btnupdate' , hidden : true},
				{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' , itemId : 'btncancel' },
				'-'
				]
			}
		;
		return item;
	},

	createwest : function () {
		var me = this,
			item = {
				xtype			: 'form-panel',
				dock			: 'left',
				itemId			: 'mainForm',
				width			: 360,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 340, labelWidth : 65, labelSeparator : '' },
				items			: [
					{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
						items : [
							{	fieldLabel	: Language.get('', 'AoneCode' ),
								xtype		: 'textfield',
								name		: 'invc_numb',
								readOnly	: true,
								width		: 305,
								fieldCls	: 'requiredindex',
								margin		: '7 0 0 0'
							},{	xtype		: 'textfield',
								name		: 'amnd_degr',
								hidden		: true,
								value		: '1',
							},{	name		: 'modify'		, xtype	: 'textfield' , value : 'n' , hidden : true
							},{	name		: 'line_seqn'	, xtype : 'textfield' , hidden : true
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
						items : [
							{	name	: 'drtr_idcd' , xtype : 'textfield' , hidden : true
							},{	name	: 'imge_chek1', xtype : 'textfield' , value : 'n' , hidden : true
							},{	name	: 'imge_chek2', xtype : 'textfield' , value : 'n' , hidden : true
							},{	name	: 'sral_numb' , xtype : 'textfield' , hidden : true
							},{	name 	: 'modify'	  , xtype : 'textfield' , value : 'n' , hidden : true
							},{ name	: 'dept_idcd' , xtype : 'textfield ', hidden : true
							},
						]
					},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
						items : [
							{	fieldLabel	: Language.get('', '엔지니어' ),
								name		: 'prod_drtr_name',
								pair		: 'prod_drtr_idcd',
								xtype		: 'popupfield',
								width		: 175,
								editable	: false,
								value		: '',
								enableKeyEvents : true,
								listeners	:{
									change : function(self, value){
										if (value != ''){
											var panel = this.up('form');
											panel.down('[name=acpt_stat_dvcd]').setValue('2000');
										}
									}
								},
								popup		: {
									widget	: 'lookup-user-popup',
									select	: 'SINGLE',									 																										
									params	: { 
										stor_grp : _global.stor_grp, 
										line_stat : '0',
										},										
									result	: function(records, nameField, pairField ) {
											nameField.setValue(records[0].get('user_name'));
											pairField.setValue(records[0].get('user_idcd'));																					
									}
								}
							},{name : 'prod_drtr_idcd'	, xtype	: 'textfield', hidden : true
							},{name : 'acpt_stat_dvcd'	, xtype	: 'textfield', hidden : true
							}							
						]
					},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
						items : [
							{	fieldLabel	: Language.get('', '지시일자' ),
								xtype		: 'datefield',
								name		: 'pdod_date',
								width		: 175,
								editable	: false,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: '',
								listeners	: {
									change : function(self, value){
										var panel	  = this.up('form');

										if(value != ''){
											var plan_strt_date = value;
											panel.down('[name=plan_strt_date]').setValue(plan_strt_date);

											var plan_endd_date = Ext.Date.add(new Date(plan_strt_date), Ext.Date.DAY, +7);
											panel.down('[name=plan_endd_date]').setValue(plan_endd_date);
										}
									}
								}
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 0',
						items	: [
							{	fieldLabel	: Language.get('','작업계획'),
								xtype		: 'betweenfield',
								name		: 'plan_strt_date',
								pair		: 'plan_endd_date',
								width		: 175,
								root		: true,
								margin		: '0 0 0 5',
								editable	: false,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: '',
							},{	xtype		: 'betweenfield',
								fieldLabel	: '~',
								labelWidth	: 10,
								name		: 'plan_endd_date',
								pair		: 'plan_strt_date',
								width		: 129,
								margin		: '0 0 0 1',
								editable	: false,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: '',
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
						items	: [
							{	fieldLabel	: Language.get('','지시사항'),
								xtype		: 'textarea',
								name		: 'memo',
								width		: 305,
								height		: 80,
							},
						]
					},
				]
			};
		return item;
	},

	createTabs : function () {
		var me = this,
			item = {
				xtype	: 'tabpanel',
				region	: 'center',
				itemId	: 'editorTabs',
				margin	: 0,
				plain	: true,
				items	: [
					{title : '견적 자재 내역'	,xtype: 'module-aone-sorderplan-worker-mtrl'},
					me.createTab2(),
					// {title : '첨부파일'		,xtype: 'module-aone-sorderplan-worker-editorLister'},
					me.createTab4(),
				]
			}
		;
		return item;
	},

	createTab2 : function(){
		var me = this,
			item = {
				title	: '견적비',
				name	: 'esti_info',
				xtype	: 'form-panel',
				dock	: 'left',
				region	: 'center',
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 340, labelWidth : 65, labelSeparator : '' },
				items			: [
					{	xtype : 'fieldset', layout: 'vbox', border : 0,  margin : '4 0 0 5',
						items : [
							{	xtype : 'fieldset', layout: 'vbox', border : 0,  margin : '4 0 5 5',
								items	: [
									{	fieldLabel	: Language.get('','원가'),
										xtype		: 'numericfield',
										name		: 'esti_amnt',
										width		: 305,
										value		: '',
										fieldCls	: 'requiredindex',
										summaryType	: 'sum',
										format		: '#,##0',
										readOnly	: true,
									},
								]
							},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('','기업이윤(%)'),
										xtype		: 'numericfield',
										name		: 'comp_prft',
										width		: 100,
										maxValue	: '100',
										margin		: '0 0 0 5',
										fieldCls	: 'requiredindex',
										enableKeyEvents : true,
										readOnly	: true,
									},{	fieldLabel	: Language.get('','='),
										xtype		: 'numericfield',
										name		: 'comp_prft2',
										labelWidth	: 15,
										width		: 205,
										format		: '#,##0',
										fieldCls	: 'requiredindex',
										enableKeyEvents : true,
										readOnly	: true,
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('','작업시간'),
										xtype		: 'numericfield',
										name		: 'work_time',
										width		: 100,
										maxValue	: '20',
										margin		: '0 0 0 5',
										fieldCls	: 'requiredindex',
										enableKeyEvents : true,
										readOnly	: true,
									},{	fieldLabel	: Language.get('','X 단가'),
										xtype		: 'lookupfield',
										name		: 'work_time2',
										width		: 110,
										labelWidth	: 40,
										format		: '#,##0',
										fieldCls	: 'requiredindex',
										enableKeyEvents : true,
										readOnly	: true,
									},{	fieldLabel	: Language.get('','='),
										xtype		: 'numericfield',
										name		: 'work_time3',
										width		: 95,
										labelWidth	: 15,
										format		: '#,##0',
										fieldCls	: 'requiredindex',
										enableKeyEvents : true,
										readOnly	: true,
									}
								]
							},{	xtype : 'fieldset', layout: 'vbox', border : 0,  margin : '4 0 5 5',
								items	: [
									{	fieldLabel	: Language.get('','견적금액'),
										xtype		: 'numericfield',
										name		: 'make_cost',
										width		: 305,
										format		: '#,##0',
										fieldCls	: 'requiredindex',
										enableKeyEvents : true,
										readOnly	: true,
									}
								]
							}
						]
					}
				]
			}
		return item;
	},

	createTab4 : function() {
		var me = this,
			item = {
				title	: '수리전 이미지',
				xtype	: 'panel',
				layout	: 'border',
				items	: [
					{	xtype : 'module-aone-sorderplan-image-lister',
						flex	: 1,
						region	: 'center',
						spilt	:true,
						style	: Const.borderLine.right,
					},{	xtype : 'module-aone-sorderplan-image',
						flex	: 1,
						region	: 'east',
						style	: Const.borderLine.left
					}
				]
			}
		;
		return item;
	}
});