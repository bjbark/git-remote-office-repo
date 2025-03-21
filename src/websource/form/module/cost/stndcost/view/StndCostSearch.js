Ext.define('module.cost.stndcost.view.StndCostSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-stndcost-search',

	initComponent: function() {
		var me = this;
		me.items = [ me.searchBasic(), me.createLine1()];
		me.callParent();
	},
	searchBasic : function() {
		var me = this,
			line = {
				xtype	: 'fieldset',
				border	: 0,
				style	: { borderColor : '#8C8C8C', borderStyle : 'solid' },
				region	: 'center',
				width	: '100%',
				height	: 40,
				margin	: '0 40 0 40',
				items	: [
					{	xtype		: 'fieldset',
						border		: 3,
						flex		: 1,
						style		: { borderColor	: '#000081', borderStyle	: 'solid' },
						region		: 'center',
						height		: 34,
						margin		: '3 0 0 0',
						defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout		: 'hbox',
						items		:[
							{	xtype	: 'label',
								fieldCls: 'requiredindex',
								text	: 'SEARCH  | ',
								margin	: '5 10 0 0',
								style	: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{ name	: 'find_name',
								xtype	: 'searchfield',
								flex	: 4,
								emptyText: Language.get('acpt_case_name', '금형명')+' 또는 재질을 입력하세요....',
								enableKeyEvents : true,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]');
											searchButton.fireEvent('click', searchButton); //엔터or탭으로 조회
										}
									},
								}
							}
						]
					},{	xtype	: 'button'  ,action : Const.SELECT.action, margin : '2 2 0 0',region : 'north' , width   : 40, height 	: 36,
						style	: 'background:url("../../../resource/img/btn_search_icon.png")'
					},{	xtype	: 'fieldset',border	: 0 ,region	: 'north',height  : 34, width	: 2
					}
				]
			};
		return line;
	},

	createLine1 : function(){
		var me = this,
			line = {
				xtype : 'fieldset',
				title : '상세검색',
				collapsible : true,
				collapsed	: true,
				items : [
					{	fieldLabel	: Language.get('stnd_date','기준일자'),
						xtype		: 'betweenfield',
						name		: 'stnd1_date',
						pair		: 'stnd2_date',
						width		: 198,
						labelWidth	: 100,
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						value		: ''
					},{	fieldLabel	: Language.get('','~'),
						xtype		: 'betweenfield',
						name		: 'stnd2_date',
						pair		: 'stnd1_date',
						width		: 116,
						labelWidth	: 19,
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						value		: ''
					},{	fieldLabel	: Language.get('acpt_case_name','금형명'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'mold_name',
						pair		: 'mold_idcd',
						clearable	: true,
						width		: 250,
						labelWidth	: 40,
						margin		: '0 0 0 30',
						popup		:
							{	select	: 'SINGLE',
								widget	: 'lookup-mold-popup',
								params	: { stor_grp : _global.stor_grp , line_stat : '0' },
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('mold_name'));
									pairField.setValue(records[0].get('mold_idcd'));
								}
							}
					},{ name : 'mold_idcd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('colr_bacd','재질'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'mtrl_bacd_name',
						pair		: 'mtrl_bacd',
						clearable	: true,
						width		: 180,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-base-popup',
							params	: { stor_grp : _global.stor_grp , line_stat : '0', prnt_idcd : '3101' },
							result	: function(records, nameField, pairField) {
								nameField.setValue(records[0].get('base_name'));
								pairField.setValue(records[0].get('base_code'));
							}
						}
					},{	name	: 'mtrl_bacd', xtype : 'textfield' , hidden : true
					}
				]
			}
		;
		return line;
	}
});