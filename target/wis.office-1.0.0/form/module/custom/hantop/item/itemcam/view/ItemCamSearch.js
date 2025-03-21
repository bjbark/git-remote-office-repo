Ext.define('module.custom.hantop.item.itemcam.view.ItemCamSearch', { extend: 'Axt.form.Search',
	alias: 'widget.module-itemcam-search',

	initComponent: function(){
		var me = this;
		me.items =  [
			me.searchBasic(),
			me.createLine1(),
		];
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
					{	xtype	: 'fieldset',
						border	: 3,
						flex	: 1,
						style	: { borderColor	: '#000081', borderStyle	: 'solid' },
						region	: 'center',
						height	: 34,
						margin 	: '3 0 0 0',
						defaults: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout	: 'hbox',
						items	: [
							{	xtype	: 'label'			,
								fieldCls: 'requiredindex'	,
								text	: 'SEARCH  | '		,
								margin	: '5 10 0 0'		,
								style	: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{	fieldLabel	: Language.get('brnd_name','브랜드'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'brnd_name',
								pair		: 'brnd_bacd',
								labelWidth	: 50,
								width		: 160,
								clearable	: true,
								emptyText	:'',
								popup: {
									select : 'SINGLE',
									widget : 'lookup-base-popup',
									params : { stor_grp : _global.stor_grp ,prnt_idcd : '4000' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('base_name'));
										pairField.setValue(records[0].get('base_code'));
									}
								}
							},{ xtype:'hiddenfield' , name : 'brnd_bacd'
							},{	name	: 'find_name'		,
								xtype		: 'searchfield'	,
								flex		: 4				,
								emptyText	: '조회할 거래처코드 또는 거래처명을 입력하세요...',
								enableKeyEvents : true			,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]');
											searchButton.fireEvent('click', searchButton); //조회버튼클릭
										}
									}
								}
							}
						]
					},{	xtype	: 'button'  ,action : Const.SELECT.action, margin : '2 2 0 0',region : 'north' , width : 40, height : 36,
						style	: 'background:url("../../../resource/img/btn_search_icon.png")'
					},{	xtype	: 'fieldset',border	: 0 ,region	: 'north',height  : 34, width	: 2
					},
				]
			};
		return line;
	},

	createLine1 : function(){
		var me = this,
		line = {
			xtype			: 'fieldset',
			title			: '상세검색',
			collapsible		: true,
			collapsed		: true,
			layout			: 'vbox',
			defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 , },
			fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
			items			: [
				{	xtype : 'fieldset', layout: 'hbox',
					items : [
						{	fieldLabel	: Language.get('esti_date','견적일자'),
							xtype		: 'betweenfield',
							name		: 'esti_date1',
							pair		: 'esti_date2',
							labelWidth	: 99,
							width		: 198,
							margin		: '0 0 0 2',
							root		: true,
							value		: ''
						},{	xtype		: 'betweenfield',
							fieldLabel	:'~',
							name		: 'esti_date2',
							pair		: 'esti_date1',
							labelWidth	: 15,
							width		: 115,
							value		: ''
						},{	fieldLabel	: Language.get('cstm','거래처'),
							xtype		: 'popupfield',
							clearable	: true,
							editable	: true,
							enableKeyEvents : true,
							name		: 'cstm_name',
							width		: 250,
							pair		: 'cstm_idcd',
							popup: {
								select : 'SINGLE',
								widget : 'lookup-cstm-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0' },
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('cstm_name'));
									pairField.setValue(records[0].get('cstm_idcd'));
								}
							},
							listeners	: {
								change	: function() {
									var val = this.getValue();
									if(val=='' || val == null){
										me.down('[name=cstm_idcd]').reset();
									}
								}
							}
						},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
						},{	fieldLabel	: Language.get('sale_drtr_name','영업담당'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							clearable	: true,
							name		: 'drtr_name',
							width		: 207,
							labelWidth	: 100,
							pair		: 'drtr_idcd',
							popup: {
								select : 'SINGLE',
								widget : 'lookup-user-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0' },
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('user_name'));
									pairField.setValue(records[0].get('user_idcd'));
								}
							},
							listeners	: {
								change	: function() {
									var val = this.getValue();
									if(val=='' || val == null){
										me.down('[name=drtr_idcd]').reset();
									}
								}
							}
						},{	name : 'drtr_idcd', xtype : 'textfield' , hidden : true
						}
					]
				},{	xtype : 'fieldset', layout: 'hbox',
					items : [
						{	fieldLabel	: Language.get('deli_date','납기일자'),
							xtype		: 'betweenfield',
							name		: 'deli_date1',
							pair		: 'deli_date2',
							labelWidth	: 99,
							width		: 198,
							margin		: '0 0 0 2',
							root		: true,
							value		:''
						},{	fieldLabel	: Language.get('','~'),
							xtype		: 'betweenfield',
							name		: 'deli_date2',
							pair		: 'deli_date1',
							labelWidth	: 15,
							width		: 115,
							value		:''
						},{	fieldLabel	: Language.get('','현장명'),
							xtype		: 'textfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'item_name',
							width		: 250,
						},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
						},{	fieldLabel	: Language.get('line_clos','마감상태'),
							xtype		: 'lookupfield',
							name		: 'line_clos',
							lookupValue	: resource.lookup('line_clos'),
							value			: '0',
							width		: 207
						}
					]
				}
			]
		};
	return line;
	},
});