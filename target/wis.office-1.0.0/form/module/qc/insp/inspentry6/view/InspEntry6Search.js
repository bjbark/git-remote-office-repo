Ext.define('module.qc.insp.inspentry6.view.InspEntry6Search', { extend: 'Axt.form.Search',


	alias: 'widget.module-inspentry6-search',
	/**
	 *
	 */
	initComponent: function(){
		var me = this;
		me.items = [
			me.searchBasic(),
			me.createLine1(),
			me.createLine2()
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
							},{	name	: 'find_name'		,
								xtype		: 'searchfield'	,
								flex		: 4				,
								emptyText	: '',
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
					}
				]
			};
		return line;
	},

	/**
	 * 라인1
	 */
	createLine1 : function(){
		var me = this,
			line = {
				xtype	: 'fieldset',
				layout	:'hbox',
//				title: '상세검색',
//				collapsible: true,
//				collapsed: true,
				margin 	: '5 0 5 0',
				items	: [
					{	fieldLabel	: Language.get('insp_date','검사기간'),
						xtype		: 'betweenfield',
						name		: 'invc1_date',
						pair		: 'invc2_date',
						width		: 182,
						labelWidth	: 77,
						value		: Ext.Date.add( new Date(), Ext.Date.DAY, -30),
					},{	fieldLabel	: '~',
						xtype		: 'betweenfield',
						name		: 'invc2_date',
						pair		: 'invc1_date',
						width		: 115,
						labelWidth	: 15,
						value		: Ext.Date.add( new Date(), Ext.Date.DAY, +0),
					},{	fieldLabel	: Language.get('acpt_numb','주문번호'),
						xtype		: 'textfield',
						name		: 'invc_numb',
						width		: 200,
					},{	fieldLabel	: Language.get('cstm_lott_numb','LOT번호'),
						xtype		: 'textfield',
						name		: 'cstm_lott_numb',
						width		: 200,
					},{	fieldLabel	: Language.get('insp_drtr', '검사담당' ),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'user_name',
						pair		: 'insp_drtr_idcd',
						emptyText	: Const.infoNull.queryAll,
						clearable	: true,
						popup		: {
							widget	: 'lookup-user-popup',
							select	: 'SINGLE',
							params	: { stor_grp : _global.stor_grp },
							result	: function(records, nameField, pairField) {
								nameField.setValue(records[0].get('user_name'));
								pairField.setValue(records[0].get('user_idcd'));
							}
						}
					},{	xtype		: 'textfield', name : 'insp_drtr_idcd', hidden : true
					}
				]
			}
		return line;
	},
	/**
	 * 라인1
	 */
	createLine2 : function(){
		var me = this,
			line = {
				xtype	: 'fieldset',
				layout	:'hbox',
				items	: [
					{	fieldLabel	: Language.get('item_name','품명'),
						xtype		: 'textfield',
						name		: 'item_name',
						width		: 297,
						labelWidth	: 77
					}
				]
			}
		return line;
	}
});