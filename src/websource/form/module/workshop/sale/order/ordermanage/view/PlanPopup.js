Ext.define('module.workshop.sale.order.ordermanage.view.PlanPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-ordermanage-plan-popup',
	title		: '생산지시',
	closable	: true,
	autoShow	: true,
	width		: 690 ,
	height		: 710 ,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'plan_name',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);

		var param = Ext.merge( { invc_numb : me.popup.params.invc_numb}  );
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
						{ text: '<span class="btnTemp" style="font-size:1.2em">생산지시</span>' ,  handler: me.update, cls: 'button-style' },
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
					]
				}
			],
			items : [me.editorForm(),{xtype:'module-ordermanage-plan-lister'},me.createTabs(),
]
		};
		return form;
	},

	editorForm : function () {
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			itemId	: 'plan',
			margin	: '15 7 0 -10',
			layout	: { type: 'vbox', align: 'stretch' } ,
			height		: 210 ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 680,
							fieldDefaults: { width : 300, labelWidth : 60, labelSeparator : '' },
							items		: [
								{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 28',
									items	: [
										{	fieldLabel	: Language.get('invc_numb','주문번호'),
											name		: 'invc_numb',
											xtype		: 'textfield',
											readOnly	: true,
											fieldCls	: 'readonlyfield',
											width		: 200
										},{	fieldLabel	: Language.get('deli_date','납기일자'),
											xtype		: 'datefield',
											name		: 'deli_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											labelWidth	: 70,
											margin		: '0 0 0 230',
											width		: 170,
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 28',
									items	: [
										{	fieldLabel	: Language.get('mmbr_name','고객명'),
											name		: 'mmbr_name',
											xtype		: 'textfield',
											width		: 200
										},{	fieldLabel	: Language.get('tele_numb','전화번호'),
											name		: 'tele_numb',
											xtype		: 'textfield',
											labelWidth	: 70,
											width		: 190,

										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 28',
									items	: [
										{	fieldLabel	: Language.get('work_memo','요청메모'),
											name		: 'work_memo',
											xtype		: 'textfield',
											width		: 602,
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 45',
									items	: [
										{	xtype	: 'fieldcontainer'  ,
											layout	: { type: 'vbox', align: 'stretch' } ,
											style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
											width	: 50,
											height	: 20,
											margin	: '0 0 2 0',
											items	: [
												{	text	: '구분', xtype : 'label', style : 'text-align:center;', margin : '4 0 0 0'
												}
											]
										},{	xtype	: 'fieldcontainer'  ,
											layout	: { type: 'vbox', align: 'stretch' } ,
											style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
											width	: 105,
											height	: 20,
											margin	: '0 0 2 0',
											items	: [
													{	text	: '착수일자', xtype : 'label', style : 'text-align:center;', margin : '4 0 0 0'
													}
											]
										},{	xtype	: 'fieldcontainer'  ,
												layout	: { type: 'vbox', align: 'stretch' } ,
												style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
												width	: 105,
												height	: 20,
												margin	: '0 0 2 0',
												items	: [
													{	text	: '종료일자', xtype : 'label', style : 'text-align:center;', margin : '4 0 0 0'
													}
												]
										},{	xtype	: 'fieldcontainer'  ,
												layout	: { type: 'vbox', align: 'stretch' } ,
												style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
												width	: 115,
												height	: 20,
												margin	: '0 0 2 0',
												items	: [
													{	text	: '소요시간', xtype : 'label', style : 'text-align:center;', margin : '4 0 0 0'
													}
												]
										},{	xtype	: 'fieldcontainer'  ,
												layout	: { type: 'vbox', align: 'stretch' } ,
												style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
												width	: 105,
												height	: 20,
												margin	: '0 0 2 0',
												items	: [
													{	text	: '제작담당', xtype : 'label', style : 'text-align:center;', margin : '4 0 0 0'
													}
												]
										},{	xtype	: 'fieldcontainer'  ,
											layout	: { type: 'vbox', align: 'stretch' } ,
											style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
											width	: 105,
											height	: 20,
											margin	: '0 0 2 0',
											items	: [
												{	text	: '사용설비', xtype : 'label', style : 'text-align:center;', margin : '4 0 0 0'
												}
											]
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 45',
										items	: [
										{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox', align: 'stretch' } ,
										style	: Const.borderLine.bottom  + Const.borderLine.left  ,
										width	: 50,
										height	: 26,
										margin	: '0 0 2 0',
										items	: [
											{	text	: '제작물', xtype : 'label', style : 'text-align:center;', margin		: '6 2 2 2'
											}
										]
								},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox', align: 'stretch' } ,
										style	: Const.borderLine.bottom  + Const.borderLine.left  ,
										width	: 105,
										height	: 26,
										margin	: '0 0 2 0',
										items	: [
											{	xtype		: 'betweenfield',
												name		: 'strt_date1',
												pair		: 'endd_date1',
												format		: Const.DATE_FORMAT_YMD_BAR,
												submitFormat: Const.DATE_FORMAT_YMD,
												margin		: '2 2 2 2',
												root		: true,
												value		: ''
											}
										]
								},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox', align: 'stretch' } ,
										style	: Const.borderLine.bottom  +  Const.borderLine.right + Const.borderLine.left  ,
										width	: 105,
										height	: 26,
										margin	: '0 0 2 0',
										items	: [
											{	xtype		: 'betweenfield',
												name		: 'endd_date1',
												pair		: 'strt_date1',
												format		: Const.DATE_FORMAT_YMD_BAR,
												submitFormat: Const.DATE_FORMAT_YMD,
												margin		: '2 2 2 2',
												value		: ''
											}
										]
								},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox', align: 'stretch' } ,
										style	: Const.borderLine.bottom  +  Const.borderLine.right + Const.borderLine.left  ,
										width	: 53,
										height	: 26,
										margin	: '0 0 2 0',
										items	: [
											{	xtype		: 'numericfield',
												name		: 'need_time1',
												width		: 45,
												margin		: '2 2 2 2'
											}
										]
								},{	xtype	: 'fieldcontainer'  ,
									layout	: { type: 'vbox', align: 'stretch' } ,
									style	: Const.borderLine.bottom  +  Const.borderLine.right + Const.borderLine.left  ,
									width	: 10,
									height	: 26,
									margin	: '0 0 2 0',
									items	: [
											{	text	: ':', xtype : 'label', style : 'text-align:center;', margin : '6 2 2 2'
											}
										]
								},{	xtype	: 'fieldcontainer'  ,
									layout	: { type: 'vbox', align: 'stretch' } ,
									style	: Const.borderLine.bottom  +  Const.borderLine.right + Const.borderLine.left  ,
									width	: 52,
									height	: 26,
									margin	: '0 0 2 0',
									items	: [
										{	xtype		: 'numericfield',
											name		: 'need_mint1',
											width		: 45,
											margin		: '2 2 2 2'
										}
									]
								},{		xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox', align: 'stretch' } ,
										style	: Const.borderLine.bottom  +  Const.borderLine.right + Const.borderLine.left  ,
										width	: 105,
										height	: 26,
										margin	: '0 0 2 0',
										items	: [
											{	name		: 'drtr_name1',
												pair		: 'drtr_idcd1',
												xtype		: 'popupfield',
												editable	: true,
												enableKeyEvents : true,
												clearable	: true ,
												width		: 185,
												margin		: '2 2 2 2',
												popup		: {
													widget	: 'lookup-user-popup',
													select	: 'SINGLE',
													params	: { stor_grp : _global.stor_grp, line_stat : '0' },
													result	: function(records, nameField, pairField ) {
														nameField.setValue(records[0].get('user_name'));
														pairField.setValue(records[0].get('user_idcd'));
													}
												}
											},{	name : 'drtr_idcd1', xtype	: 'textfield', hidden : true
											}
										]
										},{	xtype	: 'fieldcontainer'  ,
											layout	: { type: 'vbox', align: 'stretch' } ,
											style	: Const.borderLine.bottom  +  Const.borderLine.right + Const.borderLine.left  ,
											width	: 105,
											height	: 26,
											margin	: '0 0 2 0',
											items	: [
											{	name		: 'cvic_name1',
												pair		: 'cvic_idcd1',
												xtype		: 'popupfield',
												editable	: true,
												enableKeyEvents : true,
												clearable	: true ,
												width		: 185,
												margin		: '2 2 2 2',
												popup		: {
													widget	: 'lookup-cvic-popup',
													select	: 'SINGLE',
													params	: { stor_grp : _global.stor_grp, line_stat : '0' },
													result	: function(records, nameField, pairField ) {
														nameField.setValue(records[0].get('cvic_name'));
														pairField.setValue(records[0].get('cvic_idcd'));
													}
												}
											},{	name : 'cvic_idcd1', xtype	: 'textfield', hidden : true
											}
											]
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 45',
									items	: [
									{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox', align: 'stretch' } ,
										style	: Const.borderLine.bottom  + Const.borderLine.left  ,
										width	: 50,
										height	: 26,
										margin	: '0 0 2 0',
										items	: [
											{	text	: '표지', xtype : 'label', style : 'text-align:center;', margin		: '6 2 2 2'
											}
										]
										},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox', align: 'stretch' } ,
										style	: Const.borderLine.bottom  + Const.borderLine.left  ,
										width	: 105,
										height	: 26,
										margin	: '0 0 2 0',
										items	: [
											{	xtype		: 'betweenfield',
												name		: 'strt_date2',
												pair		: 'endd_date2',
												format		: Const.DATE_FORMAT_YMD_BAR,
												submitFormat: Const.DATE_FORMAT_YMD,
												margin		: '2 2 2 2',
												root		: true,
												value		: ''
											}
										]
										},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox', align: 'stretch' } ,
										style	: Const.borderLine.bottom  +  Const.borderLine.right + Const.borderLine.left  ,
										width	: 105,
										height	: 26,
										margin	: '0 0 2 0',
										items	: [
											{	xtype		: 'betweenfield',
												name		: 'endd_date2',
												pair		: 'strt_date2',
												format		: Const.DATE_FORMAT_YMD_BAR,
												submitFormat: Const.DATE_FORMAT_YMD,
												margin		: '2 2 2 2',
												value		: ''
											}
										]
										},{	xtype	: 'fieldcontainer'  ,
											layout	: { type: 'vbox', align: 'stretch' } ,
											style	: Const.borderLine.bottom  +  Const.borderLine.right + Const.borderLine.left  ,
											width	: 53,
											height	: 26,
											margin	: '0 0 2 0',
											items	: [
												{	xtype		: 'numericfield',
													name		: 'need_time2',
													width		: 45,
													margin		: '2 2 2 2'
												}
											]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox', align: 'stretch' } ,
										style	: Const.borderLine.bottom  +  Const.borderLine.right + Const.borderLine.left  ,
										width	: 10,
										height	: 26,
										margin	: '0 0 2 0',
										items	: [
												{	text	: ':', xtype : 'label', style : 'text-align:center;', margin : '6 2 2 2'
												}
											]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox', align: 'stretch' } ,
										style	: Const.borderLine.bottom  +  Const.borderLine.right + Const.borderLine.left  ,
										width	: 52,
										height	: 26,
										margin	: '0 0 2 0',
										items	: [
											{	xtype		: 'numericfield',
												name		: 'need_mint2',
												width		: 45,
												margin		: '2 2 2 2'
											}
										]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox', align: 'stretch' } ,
										style	: Const.borderLine.bottom  +  Const.borderLine.right + Const.borderLine.left  ,
										width	: 105,
										height	: 26,
										margin	: '0 0 2 0',
										items	: [
											{	name		: 'drtr_name2',
												pair		: 'drtr_idcd2',
												xtype		: 'popupfield',
												editable	: true,
												enableKeyEvents : true,
												clearable	: true ,
												width		: 185,
												margin		: '2 2 2 2',
												popup		: {
													widget	: 'lookup-user-popup',
													select	: 'SINGLE',
													params	: { stor_grp : _global.stor_grp, line_stat : '0' },
													result	: function(records, nameField, pairField ) {
														nameField.setValue(records[0].get('user_name'));
														pairField.setValue(records[0].get('user_idcd'));
													}
												}
											},{	name : 'drtr_idcd2', xtype	: 'textfield', hidden : true
											}
										]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox', align: 'stretch' } ,
										style	: Const.borderLine.bottom  +  Const.borderLine.right + Const.borderLine.left  ,
										width	: 105,
										height	: 26,
										margin	: '0 0 2 0',
										items	: [
											{	name		: 'cvic_name2',
												pair		: 'cvic_idcd2',
												xtype		: 'popupfield',
												editable	: true,
												enableKeyEvents : true,
												clearable	: true ,
												width		: 185,
												margin		: '2 2 2 2',
												popup		: {
													widget	: 'lookup-cvic-popup',
													select	: 'SINGLE',
													params	: { stor_grp : _global.stor_grp, line_stat : '0' },
													result	: function(records, nameField, pairField ) {
														nameField.setValue(records[0].get('cvic_name'));
														pairField.setValue(records[0].get('cvic_idcd'));
													}
												}
											},{	name : 'cvic_idcd2', xtype	: 'textfield', hidden : true
											}
										]
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 45',
									items	: [
										{	xtype	: 'fieldcontainer'  ,
											layout	: { type: 'vbox', align: 'stretch' } ,
											style	: Const.borderLine.bottom  + Const.borderLine.left  ,
											width	: 50,
											height	: 26,
											margin	: '0 0 2 0',
											items	: [
												{	text	: '간지', xtype : 'label', style : 'text-align:center;', margin		: '6 2 2 2'
												}
											]
										},{	xtype	: 'fieldcontainer'  ,
											layout	: { type: 'vbox', align: 'stretch' } ,
											style	: Const.borderLine.bottom  + Const.borderLine.left  ,
											width	: 105,
											height	: 26,
											margin	: '0 0 2 0',
											items	: [
												{	xtype		: 'betweenfield',
													name		: 'strt_date3',
													pair		: 'endd_date3',
													format		: Const.DATE_FORMAT_YMD_BAR,
													submitFormat: Const.DATE_FORMAT_YMD,
													margin		: '2 2 2 2',
													root		: true,
													value		: ''
												}
											]
										},{	xtype	: 'fieldcontainer'  ,
											layout	: { type: 'vbox', align: 'stretch' } ,
											style	: Const.borderLine.bottom  +  Const.borderLine.right + Const.borderLine.left  ,
											width	: 105,
											height	: 26,
											margin	: '0 0 2 0',
											items	: [
												{	xtype		: 'betweenfield',
													name		: 'endd_date3',
													pair		: 'strt_date3',
													format		: Const.DATE_FORMAT_YMD_BAR,
													submitFormat: Const.DATE_FORMAT_YMD,
													margin		: '2 2 2 2',
													value		: ''
												}
											]
										},{	xtype	: 'fieldcontainer'  ,
											layout	: { type: 'vbox', align: 'stretch' } ,
											style	: Const.borderLine.bottom  +  Const.borderLine.right + Const.borderLine.left  ,
											width	: 53,
											height	: 26,
											margin	: '0 0 2 0',
											items	: [
												{	xtype		: 'numericfield',
													name		: 'need_time3',
													width		: 45,
													margin		: '2 2 2 2'
												}
											]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox', align: 'stretch' } ,
										style	: Const.borderLine.bottom  +  Const.borderLine.right + Const.borderLine.left  ,
										width	: 10,
										height	: 26,
										margin	: '0 0 2 0',
										items	: [
												{	text	: ':', xtype : 'label', style : 'text-align:center;', margin : '6 2 2 2'
												}
											]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox', align: 'stretch' } ,
										style	: Const.borderLine.bottom  +  Const.borderLine.right + Const.borderLine.left  ,
										width	: 52,
										height	: 26,
										margin	: '0 0 2 0',
										items	: [
											{	xtype		: 'numericfield',
												name		: 'need_mint3',
												width		: 45,
												margin		: '2 2 2 2'
											}
										]
									},{	xtype	: 'fieldcontainer'  ,
											layout	: { type: 'vbox', align: 'stretch' } ,
											style	: Const.borderLine.bottom  +  Const.borderLine.right + Const.borderLine.left  ,
											width	: 105,
											height	: 26,
											margin	: '0 0 2 0',
											items	: [
												{	name		: 'drtr_name3',
													pair		: 'drtr_idcd3',
													xtype		: 'popupfield',
													editable	: true,
													enableKeyEvents : true,
													clearable	: true ,
													width		: 185,
													margin		: '2 2 2 2',
													popup		: {
														widget	: 'lookup-user-popup',
														select	: 'SINGLE',
														params	: { stor_grp : _global.stor_grp, line_stat : '0' },
														result	: function(records, nameField, pairField ) {
															nameField.setValue(records[0].get('user_name'));
															pairField.setValue(records[0].get('user_idcd'));
														}
													}
												},{	name : 'drtr_idcd3', xtype	: 'textfield', hidden : true
												}
											]
										},{	xtype	: 'fieldcontainer'  ,
											layout	: { type: 'vbox', align: 'stretch' } ,
											style	: Const.borderLine.bottom  +  Const.borderLine.right + Const.borderLine.left  ,
											width	: 105,
											height	: 26,
											margin	: '0 0 2 0',
											items	: [
												{	name		: 'cvic_name3',
													pair		: 'cvic_idcd3',
													xtype		: 'popupfield',
													editable	: true,
													enableKeyEvents : true,
													clearable	: true ,
													width		: 185,
													margin		: '2 2 2 2',
													popup		: {
														widget	: 'lookup-cvic-popup',
														select	: 'SINGLE',
														params	: { stor_grp : _global.stor_grp, line_stat : '0' },
														result	: function(records, nameField, pairField ) {
															nameField.setValue(records[0].get('cvic_name'));
															pairField.setValue(records[0].get('cvic_idcd'));
														}
													}
												},{	name : 'cvic_idcd3', xtype	: 'textfield', hidden : true
												}
											]
										}
									]
								}
							]
						}
					]
				}
			]
		};
		return form;
	},

	createTabs : function () {
		var me = this,
			item = {
				xtype	: 'tabpanel',
				region	: 'south',
				margin	: 0,
				plain	: true,
				items	: [ me.createTab1(), me.createTab2() ,	{title:'내지',xtype:'module-ordermanage-shet-lister'},me.createTab3() , me.createTab4() ,{title:'상담내역',xtype:'module-ordermanage-cnsllister'} ]
			}
		;
		return item;
	},

	createTab1 : function() {
		var me = this,
			item = {
				itemId	: 'plan2',
				title		: Language.get('','주문품목'),
				xtype		: 'form-panel',
				layout		: 'vbox',
				border		: 0,
//				name		: 'planform',
				bodyStyle	: { padding: '10px' , margin		: '5 0 0 20',},
				items		: [
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
					items	: [
						{	fieldLabel	: Language.get('ttle','제목'),
							name		: 'ttle',
							xtype		: 'textfield',
							labelWidth	: 60,
							width		: 327,
						},{	fieldLabel	: '품목종류'	,
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							labelWidth	: 60,
							width		: 199,
							name		: 'clss_name',
							pair		: 'disp_invc_numb',
							clearable	: true ,
							popup		: {
								select	: 'SINGLE',
								widget	: 'module-workshop-disp-popup',
								params	: { stor_grp : _global.stor_grp , line_stat : '0' },
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('clss_name'));
									pairField.setValue(records[0].get('invc_numb'));
									var merge  = Ext.merge(me.down('[name=esti_pric]').popup.params,{invc_numb:records[0].get('invc_numb')});
									var post = me.down('[itemId=post]');
									if(records[0].get('prnt_idcd')=="0003"){
										post.down('[name=post_chk]').setValue('Y');
										post.show();
									}else{
										post.down('[name=post_chk]').setValue('');
										post.hide();
									}
								}
							}
						},{	name		: 'disp_invc_numb', xtype : 'textfield' , hidden : true,
							listeners	: {
								change	: function(){
									var val = this.getValue();
									if( val == '' || val == null ){
										var merge  = Ext.merge(me.down('[name=esti_pric]').popup.params,{invc_numb :'' });
										var post   = me.down('[itemId=post]');

										me.down('[name=esti_pric]').popup.params = merge;
										//post 초기화
										post.down('[name=post_chk]').setValue('');
										post.hide();
									}
								}
							}
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
					items	: [
						{	fieldLabel	: Language.get('shet_size_dvcd','사이즈'),
							xtype		: 'popupfield'	,
							name		: 'size_name',
							pair		: 'size_idcd',
							labelWidth	: 60,
							width		: 170,
							margin		: '0 1 0 0',
							popup		: {
								select	: 'SINGLE',
								widget	: 'module-itemclass-popup2',
								params	: { stor_grp : _global.stor_grp , line_stat : '0' },
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('clss_name'));
									pairField.setValue(records[0].get('invc_numb'));
									var merge  = Ext.merge(me.down('[name=esti_pric]').popup.params,{invc_numb:records[0].get('invc_numb')});
								}
							},
						},{	fieldLabel	: Language.get('horz_leng','가로'),
							xtype		: 'numericfield'	,
							name		: 'horz_leng',
							labelWidth	: 65,
							width		: 115,
							margin		: '0 0 0 15'
						},{	fieldLabel	: Language.get('vrtl_leng','세로'),
							xtype		: 'numericfield'	,
							name		: 'vrtl_leng',
							labelWidth	: 40,
							width		: 90,
							margin		: '0 0 0 23'
						},{	fieldLabel	: Language.get('cvst_qntt','수량'),
							xtype		: 'numericfield'	,
							name		: 'cvst_qntt',
							margin		: '0 0 0 12',
							labelWidth	: 45,
							width		: 100,
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
					items	: [
						{	fieldLabel	: Language.get('esti_pric','견적단가'),
							name		: 'esti_pric',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							clearable	: true ,
							labelWidth	: 50,
							width		: 160,
							margin		: '5 0 0 10',
							popup		: {
								widget	: 'lookup-estipric-popup',
								select	: 'SINGLE',
								params	: {
									stor_grp : _global.stor_grp,
									line_stat : '0'
								},
								result	: function(records, nameField, pairField ) {
									nameField.setValue(records[0].get('esti_pric'));
								}
							}
						}
				//		{	fieldLabel	: Language.get('esti_amnt','견적금액'),
				//			xtype		: 'numericfield'	,
				//			name		: 'esti_amnt',
				//			labelWidth	: 50,
				//			width		: 140,
				//			margin		: '0 0 0 10'
				//		}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0', itemId: 'post', hidden:false,
					items	: [
						{	fieldLabel	: Language.get('cvst_qntt','오시'),
							xtype		: 'numericfield'	,
							name		: 'cvst_qntt',
							labelWidth	: 60,
							width		: 100,
						},{	fieldLabel	: Language.get('cvst_qntt','미싱'),
							xtype		: 'numericfield'	,
							name		: 'cvst_qntt',
							labelWidth	: 35,
							width		: 75,
						},{	fieldLabel	: Language.get('cvst_qntt','접지'),
							xtype		: 'numericfield'	,
							name		: 'cvst_qntt',
							labelWidth	: 35,
							width		: 75,
						},{	xtype		: 'checkbox',
							boxLabel	: '코팅(유)',
							width		: 70,
							name		: 'nocl_cotn_yorn',
							inputValue	: '1',
							margin		: '0 0 0 20'
						},{	xtype		: 'checkbox',
							boxLabel	: '코팅(무)',
							width		: 60,
							name		: 'nocl_cotn_yorn',
							inputValue	: '1',
							margin		: '0 0 0 5'
						},{	fieldLabel	: Language.get('','컬러'),
							xtype		: 'lookupfield'	,
							name		: 'prnt_mthd_dvcd',
							labelWidth	: 40,
							width		: 121,
							lookupValue	: resource.lookup('prnt_mthd_dvcd')
						},{	xtype		: 'textfield',
							hidden		: true,
							name		: 'post_chk'
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
					items	: [
						{	fieldLabel	: Language.get('work_memo_item','작업메모'),
							name		: 'work_memo_item',
							xtype		: 'textarea',
							labelWidth	: 60,
							height		: 45,
							width		: 527,
						}
					]
				}
			]
		}
		;
		return item;
	},
	createTab2 : function() {
		var me = this,
		item ={
				title		: Language.get( '' , '표지'),
				xtype		: 'form-panel',
				layout		: 'vbox',
				border		: 0,
				itemId		: 'covrForm',
				bodyStyle	: { padding: '5px', margin		: '5 0 0 20' },
				region		: 'left',
				fieldDefaults: { labelWidth : 100, labelSeparator : '' },
				items		: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('bkbd_kind_name','제본'),
								xtype		: 'popupfield'	,
								name		: 'bkbd_kind_name',
								pair		: 'bkbd_kind_idcd',
								labelWidth	: 60,
								width		: 180,
								clearable	: true,
								popup		: {
									widget	: 'lookup-item-clss-popup2',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, line_stat : '0', prnt_idcd : '000053' }, // TODO 제본종류 강제로 prnt_idcd 넣어둠 수정해야함
									result	: function(records, nameField, pairField ) {
										var record = records[0];
										nameField.setValue(record.get('clss_name'));
										pairField.setValue(record.get('clss_idcd'));
									}
								},
							},{ fieldLabel	: Language.get('bkbd_dirt_dvcd','제본방향'),
								xtype		: 'lookupfield'	,
								name		: 'bkbd_dirt_dvcd',
								labelWidth	: 60,
								width		: 140,
								lookupValue	: resource.lookup('bkbd_dirt_dvcd')
							},{	xtype : 'textfield', hidden: true , name : 'bkbd_kind_idcd',
								listeners:{
									change:function(){
										var val = this.getValue();
										if(val==""){
											me.down('[name=shet_name_covr]').popup.params = "";
										}else{
											var merge = Ext.merge(me.down('[name=shet_name_covr]').popup.params,{scls_idcd : val });
											me.down('[name=shet_name_covr]').popup.params = merge;
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('shet_name','용지'),
								name		: 'shet_name_covr',
								pair		: 'shet_idcd_covr',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								clearable	: true ,
								labelWidth	: 60,
								width		: 180,
								popup		: {
									widget	: 'lookup-shetitem-popup',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, line_stat : '0'},
									result	: function(records, nameField, pairField ) {
										var record = records[0];
										nameField.setValue(record.get('shet_name'));
										pairField.setValue(record.get('shet_idcd'));
									}
								},
							},{	name : 'shet_idcd_covr', xtype	: 'textfield', hidden : true
							},{	fieldLabel	: Language.get('','컬러'),
								xtype		: 'lookupfield'	,
								name		: 'prnt_colr_bacd_covr',
								labelWidth	: 60,
								width		: 140,
								lookupValue	: resource.lookup('prnt_mthd_dvcd')
							},{	fieldLabel	: Language.get('','평량'),
								xtype		: 'lookupfield'	,
								name		: '',
								labelWidth	: 60,
								width		: 140,

							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('dsgn_code','디자인번호'),
								name		: 'dsgn_code',
								xtype		: 'textfield',
								labelWidth	: 60,
								width		: 180,
							},{	fieldLabel	: Language.get('covr_dsgn_dvcd','디자인구분'),
								xtype		: 'lookupfield'	,
								name		: 'covr_dsgn_dvcd',
								lookupValue	: resource.lookup('covr_dsgn_dvcd'),
								labelWidth	: 60,
								width		: 140,
							},{	fieldLabel	: Language.get('esti_amnt','견적가'),
								name		: 'esti_amnt',
								xtype		: 'numericfield',
								labelWidth	: 60,
								width		: 140,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','코팅'),
								xtype	: 'radiofield',
								allowBlank: true,
								boxLabel: '무광' ,
								name : 'sub',
								labelWidth	: 60,
								width		: 140,
								inputValue : '1',
							},{	xtype	: 'radiofield',
								allowBlank: true,
								boxLabel: '유광',
								name : 'sub',
								width : 80 ,
								inputValue : '2',
							},{	xtype	: 'radiofield',
								allowBlank: true,
								boxLabel: '코팅없음',
								name : 'sub',
								width : 80 ,
								inputValue : '3',
								checked : true,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('fcvr_strg','앞표지'),
								name		: 'fcvr_strg',
								xtype		: 'textfield',
								labelWidth	: 60,
								width		: 420,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('scvr_strg','측면'),
								name		: 'scvr_strg',
								xtype		: 'textfield',
								labelWidth	: 60,
								width		: 420,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('bcvr_strg','뒷표지'),
								name		: 'bcvr_strg',
								xtype		: 'textfield',
								labelWidth	: 60,
								width		: 420,
							}
						]
					}
				]
			}
		;
		return item;
	},

	createTab3 : function() {
		var me = this,
		item ={
				xtype		: 'form-panel',

				title		: Language.get( '' , '간지'),
				layout		: 'vbox',
				border		: 0,
				height		: 280,
				bodyStyle	: { padding: '10px', margin		: '5 0 0 20' },
				region		: 'left',
				fieldDefaults: { labelWidth : 100, labelSeparator : '' },
				items		: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('shet_name','용지'),
								name		: 'shet_indx_name',
								pair		: 'shet_idcd_indx',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								clearable	: true ,
								labelWidth	: 60,
								width		: 180,
								popup		: {
									widget	: 'lookup-shetitem-popup',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, line_stat : '0'},
									result	: function(records, nameField, pairField ) {
										var record = records[0];
										nameField.setValue(record.get('shet_name'));
										pairField.setValue(record.get('shet_idcd'));
									}
								},
								listeners	: {
									change	: function(){
										var val = this.getValue();
										if( val == '' || val == null ){
											me.down('[name=esti_amnt_indx]').reset();
											me.down('[name=prnt_colr_name_indx]').reset();
											me.down('[name=prnt_colr_bacd_indx]').reset();
										}
									}
								}
							},{	name : 'shet_idcd_indx', xtype	: 'textfield', hidden : true
							},{	fieldLabel	: Language.get('prnt_colr_name','컬러'),
								name		: 'prnt_colr_name_indx',
								pair		: 'prnt_colr_bacd_indx',
								xtype		: 'popupfield',
								labelWidth	: 100,
								width		: 220,
								editable	: true,
								enableKeyEvents : true,
								clearable	: true ,
								popup		: {
									widget	: 'lookup-base-popup',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, line_stat : '0',prnt_idcd:'3104' },
									result	: function(records, nameField, pairField ) {
										nameField.setValue(records[0].get('base_name'));
										pairField.setValue(records[0].get('base_idcd'));
									}
								}
							},{	name : 'prnt_colr_bacd_indx', xtype	: 'textfield', hidden : true
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','인쇄여부'),
								xtype		: 'lookupfield'	,
								name		: 'prnt_yorn',
								lookupValue	: resource.lookup('yorn'),
								labelWidth	: 60,
								width		: 180,
							},{	fieldLabel	: Language.get('indx_yorn','색인표여부'),
								xtype		: 'lookupfield'	,
								name		: 'indx_yorn',
								lookupValue	: resource.lookup('yorn'),
								labelWidth	: 100,
								width		: 220,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('volm_indx_qntt','권당간지수'),
								name		: 'volm_indx_qntt',
								xtype		: 'numericfield',
								labelWidth	: 60,
								width		: 180,
							},{	fieldLabel	: Language.get('esti_amnt_indx','견적가'),
								name		: 'esti_amnt_indx',
								xtype		: 'numericfield',
								labelWidth	: 100,
								width		: 220,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('page_prnt_side','페이지'),
								name		: 'page_prnt_side',
								xtype		: 'textfield',
								labelWidth	: 60,
								width		: 400,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','작업메모'),
								name		: 'work_memo_indx',
								xtype		: 'textarea',
								height		: 85,
								labelWidth	: 60,
								width		: 400,
							}
						]
					}
				]
			}
		;
		return item;
	},

	createTab4 : function() {
		var me = this,
		item ={
				title		: Language.get( '' , '후가공'),
				layout		: 'vbox',
				border		: 0,
				height		: 280,
				bodyStyle	: { padding: '10px', margin		: '5 0 0 20' },
				region		: 'left',
				fieldDefaults: { labelWidth : 100, labelSeparator : '' },
				items		: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
						items	: [
						     		{	xtype		: 'checkbox',
										boxLabel	: '무색코팅',
										width		: 100,
										name		: 'nocl_cotn_yorn',
										inputValue	: '1',
										margin		: '0 0 0 50'
									},{	xtype		: 'checkbox',
										boxLabel	: '광택코팅',
										name		: 'vosh_cotn_yorn',
										inputValue	: '1',
										width		: 100,
										margin		: '0 0 0 5'
									},{	xtype		: 'checkbox',
										boxLabel	: '엠보싱',
										name		: 'embo_yorn',
										inputValue	: '1',
										width		: 100,
									},{	xtype		: 'checkbox',
										boxLabel	: '무광',
										name		: 'ngls_yorn',
										inputValue	: '1',
										width		: 100,
									},{	xtype		: 'checkbox',
										boxLabel	: '유광',
										name		: 'ygls_yorn',
										inputValue	: '1',
										width		: 100,
									}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
						items	: [
							{	xtype		: 'checkbox',
								boxLabel	: '책받침',
								width		: 100,
								name		: 'bkst_yorn',
								inputValue	: '1',
								margin		: '0 0 0 50',
							},{	xtype		: 'checkbox',
								boxLabel	: '무선제본',
								name		: 'rdio_bkbd_yorn',
								checked		: '',
								width		: 100,
								margin		: '0 0 0 5',
							},{	xtype		: 'checkbox',
								boxLabel	: '메탈와이어',
								name		: 'mtrl_wire_yorn',
								inputValue	: '1',
								width		: 100,
							},{	xtype		: 'checkbox',
								boxLabel	: '투명와이어',
								name		: 'limp_wire_yorn',
								inputValue	: '1',
								width		: 100,
							},{	xtype		: 'checkbox',
								boxLabel	: '바인더',
								name		: 'bind_yorn',
								inputValue	: '1',
								width		: 100,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
						items	: [
							{	xtype		: 'checkbox',
								boxLabel	: '소프트커버무선',
								width		: 100,
								name		: 'scvr_rdio_yorn',
								inputValue	: '1',
								margin		: '0 0 0 50',
							},{	xtype		: 'checkbox',
								boxLabel	: '소프트커버펼침',
								name		: 'scvr_open_yorn',
								inputValue	: '1',
								width		: 100,
								margin		: '0 0 0 5',
							},{	xtype		: 'checkbox',
								boxLabel	: '떡제본',
								name		: 'dduk_yorn',
								inputValue	: '1',
								width		: 100,
							},{	xtype		: 'checkbox',
								boxLabel	: '평철',
								name		: 'flat_yorn',
								inputValue	: '1',
								width		: 100,
							},{	xtype		: 'checkbox',
								boxLabel	: '반철',
								name		: 'hfbk_yorn',
								inputValue	: '1',
								width		: 100,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('hole_qntt','타공수'),
								name		: 'hole_qntt',
								xtype		: 'numericfield',
								labelWidth	: 45,
								width		: 100,
							},{	fieldLabel	: Language.get('etcc_proc_amnt','기타가공비'),
								name		: 'etcc_proc_amnt',
								xtype		: 'numericfield',
								labelWidth	: 60,
								width		: 150,
								margin		:'0 0 0 30',
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','작업메모'),
								name		: 'work_memo_proc',
								xtype		: 'textarea',
								labelWidth	: 45,
								height		: 85,
								width		: 500,
							}
						]
					}
				]
			}
		;
		return item;
	},

//	createTab5 : function() {
//		var me = this,
//		item ={
//				title		: Language.get( '' , '상담내역'),
//				layout		: 'vbox',
//				border		: 0,
//				height		: 280,
//				bodyStyle	: { padding: '10px', margin		: '5 0 0 20' },
//				region		: 'left',
//				fieldDefaults: { labelWidth : 100, labelSeparator : '' },
//				items		: [
//					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
//						items	: [
//							{	fieldLabel	: Language.get('','작업메모'),
//								name		: 'user_memo',
//								xtype		: 'textarea',
//								labelWidth	: 45,
//								height		: 85,
//								width		: 400,
//							}
//						]
//					}
//				]
//			}
//		;
//		return item;
//	},


	update:function(){
		var	me     = this,
			record = me.up('form').getValues(),
			popup  = me.up('form').ownerCt,
			store  = Ext.ComponentQuery.query('module-ordermanage-lister')[0].getStore(),
			i      = 0
		;
		var parse = JSON.parse(JSON.stringify(record));

		//유효성검사
		if(record.strt_date1){
			if(!record.endd_date1){
				Ext.Msg.alert('알림','종료일자를 입력해주세요.');
				return;
			}
		}else if(record.endd_date1){
			Ext.Msg.alert('알림','시작일자를 입력해주세요.');
			return;
		}else{
			i++;
		}
		if(record.strt_date2){
			if(!record.endd_date2){
				Ext.Msg.alert('알림','종료일자를 입력해주세요.');
				return;
			}
		}else if(record.endd_date2){
			Ext.Msg.alert('알림','시작일자를 입력해주세요.');
			return;
		}else{
			i++;
		}
		if(record.strt_date3){
			if(!record.endd_date3){
				Ext.Msg.alert('알림','종료일자를 입력해주세요.');
				return;
			}
		}else if(record.endd_date3){
			Ext.Msg.alert('알림','시작일자를 입력해주세요.');
			return;
		}else{
			i++;
		}
		if(i==3){
			Ext.Msg.alert('알림','저장가능한 일정이 없습니다.');
			return;
		}


		// json array create(array)
		var arr = new Array();

		for (var i = 1; i < 4; i++) {
			var obj = new Object();
			var	strt_date = parse[('strt_date'+i+"")],
				endd_date = parse[('endd_date'+i+"")],
				need_time = parse[('need_time'+i+"")],
				need_mint = parse[('need_mint'+i+"")],
				cvic_idcd = parse[('cvic_idcd'+i+"")],
				drtr_idcd = parse[('drtr_idcd'+i+"")],
				invc_numb = parse['invc_numb'],
				minute    = 0
			;
			if(strt_date!="" && endd_date!=""){
				obj['stwk_schd_date'] = strt_date;
				obj['endd_schd_date'] = endd_date;
				if(need_time!=""){
					minute += (need_time*60);
				}
				if(need_mint !=""){
					minute += need_mint;
				}
				obj['need_time'] = minute;
				obj['cvic_idcd'] = cvic_idcd;
				obj['drtr_idcd'] = drtr_idcd;
				obj['line_seqn'] = 1;
				obj['assi_seqn'] = i;
				obj['crte_idcd'] = _global.login_pk;
				obj['updt_idcd'] = _global.login_pk;
				obj['prog_stat_dvcd'] = '0';
				obj['invc_numb'] = invc_numb;
				arr.push(obj);
			}
		}

		Ext.Ajax.request({
			url		: _global.location.http() + '/workshop/sale/order/ordermanage/set/plan.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					records		: arr
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
					popup.close();
					store.reload();
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
	}

});