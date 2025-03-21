Ext.define('module.cost.stndcost.view.StndCostEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-stndcost-editor',
	height : 330,
	layout : {
		type: 'border'
	},

	title		: Language.get('stnd_info','표준원가 정보'),
	name		: 'stnd_info',
	collapsible	: true,
	collapsed	: true,
	defaultFocus: 'stnd_date',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(),me.createWest()];
		me.items = [me.createTabs()];
		me.callParent(arguments)  ;
	},

	createDock : function () {
		var me = this,
			item = {
				xtype	: 'toolbar',
				dock	: 'bottom' ,
				items	: [
					'->', '-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }, '-'
				]
			}
		;
		return item;
	},

	createWest : function () {
		var me = this,
			item = {
				xtype			: 'form-panel',
				dock			: 'left',
				width			: 360,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 315, labelWidth : 80, labelSeparator : '' },
				layout			: 'hbox',
				items			: [
					{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						width	: 330,
						items	: [
							{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('stnd_date','기준일자'),
										xtype		: 'datefield',
										fieldCls	: 'requiredindex',
										allowBlank	: false,
										emptyText	: Const.invalid.emptyValue,
										name		: 'stnd_date',
										format		: Const.DATE_FORMAT_YMD_BAR,
										submitFormat: Const.DATE_FORMAT_YMD,
										width		: 210
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('acpt_case_name','금형명'),
										width		: 330,
										xtype		: 'popupfield',
										editable	: true,
										enableKeyEvents : true,
										name		: 'mold_name',
										pair		: 'mold_idcd',
										fieldCls	: 'requiredindex',
										allowBlank	: false,
										emptyText	: Const.invalid.emptyValue,
										popup		: {
											select : 'SINGLE',
											widget : 'lookup-mold-popup',
											params : { stor_grp : _global.stor_grp , line_stat : '0' },
											result : function(records, nameField, pairField) {
												var panel = nameField.up('form');
												var layout =('[name=stnd_info]');
												panel.down('[name=grad_dvcd]').setValue(records[0].get('grad_dvcd'));
												panel.down('[name=used_tons]').setValue(records[0].get('used_tons'));
												panel.down('[name=runr_wigt]').setValue(records[0].get('runr_wigt'));
												panel.down('[name=prod_wigt]').setValue(records[0].get('prod_wigt'));
												panel.down('[name=cycl_time]').setValue(records[0].get('cycl_time'));
												nameField.setValue(records[0].get('mold_name'));
												pairField.setValue(records[0].get('mold_idcd'));
											}
										}
									},{	name : 'mold_idcd', xtype : 'textfield' , hidden : true
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('mtrl_bacd','재질분류'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'mtrl_bacd',
									pair		: 'mtrl_bacd_name',
									width		: 330,
									popup		: {
										select	: 'SINGLE',
										widget	: 'lookup-base-popup',
										params	: { stor_grp : _global.stor_grp , line_stat : '0', prnt_idcd : '3101' },
										result	: function(records, nameField, pairField) {
											nameField.setValue(records[0].get('base_name'));
											pairField.setValue(records[0].get('base_code'));
										}
									}
								},{	name	: 'mtrl_bacd_name', xtype : 'textfield' , hidden : true
								}
							]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('grad_dvcd','등급구분'),
										xtype		: 'lookupfield',
										name		: 'grad_dvcd',
										readOnly	: true,
										width		: 155,
										lookupValue	: resource.lookup('grad_dvcd')
									},{	fieldLabel	: Language.get('used_tons','사용톤수'),
										xtype		: 'numericfield',
										name		: 'used_tons',
										margin		: '0 0 0 15',
										readOnly	: true,
										width		: 160
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('runr_wigt','런너중량'),
										xtype		: 'numericfield',
										name		: 'runr_wigt',
										readOnly	: true,
										width		: 155
									},{	fieldLabel	: Language.get('prod_wigt','제품중량'),
										xtype		: 'numericfield',
										name		: 'prod_wigt',
										margin		: '0 0 0 15',
										readOnly	: true,
										width		: 160
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('cycl_time','회전시간'),
										xtype		: 'numericfield',
										name		: 'cycl_time',
										readOnly	: true,
										width		: 155
									},{	fieldLabel	: Language.get('daly_mtrl_usag_qntt','일일재료사용량'),
										xtype		: 'numericfield',
										name		: 'daly_mtrl_usag_qntt',
										margin		: '0 0 0 15',
										width		: 160
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('need_mnhr','소요공수'),
										xtype		: 'numericfield',
										name		: 'need_mnhr',
										width		: 155
									},{	fieldLabel	: Language.get('mtrl_wdrw_rate','재료회수율'),
										xtype		: 'numericfield',
										name		: 'mtrl_wdrw_rate',
										margin		: '0 0 0 15',
										width		: 160
									},
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('mtrl_cost','재료비'),
										xtype		: 'numericfield',
										name		: 'mtrl_cost',
										width		: 155,enableKeyEvents: true ,
										listeners	: {
											keydown : function(self, e) {
												/* 엔터키 이벤트를 호출한다. */
												if (e.keyCode == e.ENTER ) {
													var panel = self.up('form');
													panel.down('[name=cost_ttsm]').setValue(self.up('form').down('[name=mtrl_cost]').getValue() + self.up('form').down('[name=labo_cost]').getValue()+ self.up('form').down('[name=udir_labo_nonn]').getValue());
												} else if (e.keyCode == e.ESC) {
												}
											},
										},
									},{	fieldLabel	: Language.get('labo_cost','노무비'),
										xtype		: 'numericfield',
										name		: 'labo_cost',
										margin		: '0 0 0 15',
										width		: 160,
										enableKeyEvents: true ,
										listeners	: {
											keydown : function(self, e) {
												/* 엔터키 이벤트를 호출한다. */
												if (e.keyCode == e.ENTER ) {
													var panel = self.up('form');
													panel.down('[name=cost_ttsm]').setValue(self.up('form').down('[name=mtrl_cost]').getValue() + self.up('form').down('[name=labo_cost]').getValue()+ self.up('form').down('[name=udir_labo_nonn]').getValue());
												} else if (e.keyCode == e.ESC) {
												}
											},
										},
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('udir_labo_nonn','간접노무비'),
										xtype		: 'numericfield',
										name		: 'udir_labo_nonn',
										width		: 155,
										enableKeyEvents: true ,
										listeners	: {
											keydown : function(self, e) {
												/* 엔터키 이벤트를 호출한다. */
												if (e.keyCode == e.ENTER ) {
													var panel = self.up('form');
													panel.down('[name=cost_ttsm]').setValue(self.up('form').down('[name=mtrl_cost]').getValue() + self.up('form').down('[name=labo_cost]').getValue()+ self.up('form').down('[name=udir_labo_nonn]').getValue());
												} else if (e.keyCode == e.ESC) {
												}
											},
										},
									},{	fieldLabel	: Language.get('cost_ttsm','원가합계'),
										xtype		: 'numericfield',
										name		: 'cost_ttsm',
										fieldCls	: 'readonlyfield',
										readOnly	: true,
										margin		: '0 0 0 15',
										width		: 160,
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('sale_pric','판매단가'),
										xtype		: 'numericfield',
										name		: 'sale_pric',
										width		: 155,
										hidden		: true
									},{	fieldLabel	: Language.get('cost_rate','원가비율'),
										xtype		: 'numericfield',
										name		: 'cost_rate',
										margin		: '0 0 0 15',
										width		: 160,
										hidden		: true
									}
								]
							}
						]
					}
				]
			}
		;
		return item;
	},

	createTabs : function () {
		var me = this,
			item = {
				xtype		: 'tabpanel' ,
				region		: 'center',
				itemId		: 'memo',
				margin		: 0 ,
				plain		: true ,
				items		: [ me.createTab1() ]
			}
		;
		return item;
	},

	createTab1 : function() {
		var me = this,
			item = {
				title		: Language.get('user_memo','메모사항'),
				xtype		: 'form-panel',
				layout		: 'hbox',
				border		: 0 ,
				bodyStyle	: { padding: '5px' },
				items		: [
					{	fieldLabel	: '' ,
						name		: 'user_memo',
						xtype		: 'textarea',
						emptyText	: '메모사항을 적어주십시오',
						height		: 250,
						flex		: 1
					},{	fieldLabel	: '' ,
						name		: 'lookup_val',
						xtype		: 'textarea	',
						readOnly	: true,
						hidden		: true
					}
				]
			}
		;
		return item;
	}
});