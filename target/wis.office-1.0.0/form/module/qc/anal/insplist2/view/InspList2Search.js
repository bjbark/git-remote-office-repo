Ext.define('module.custom.kortc.qc.anal.insplist2.view.InspList2Search', { extend: 'Axt.form.Search',


	alias: 'widget.module-insplist2-search',
	/**
	 *
	 */
	initComponent: function(){
		var me = this;
		me.items = [
			me.searchBasic(),
			me.createLine1(),
			//me.createLine2()
//			me.addonSearch()
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

	createLine1 : function(){
		var me = this,
		line = {
				xtype	: 'fieldset',
				defaults: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 2 0', padding: '0', border: 0 },
				layout	:'vbox',
				items	: [
					{	xtype	: 'fieldset', layout: 'hbox',
						width : 1200,
						items	: [
							{	fieldLabel	: Language.get('inqy_term', '조회기간' ),
								xtype		: 'betweenfield',
								layout		: 'hbox',
								margin		: '5 0 5 0',
								name		: 'invc1_date',
								pair		: 'invc2_date',
								width		: 180,
								value		: Ext.Date.add( new Date(), Ext.Date.DAY, -14),
								root		: true
							},{	fieldLabel	: '~',
								xtype		: 'betweenfield',
								name		: 'invc2_date',
								pair		: 'invc1_date',
								margin : '5 0 5 0',
								labelWidth	: 15
							},{	fieldLabel	: Language.get('line_stat', '상태' ),
								margin		: '5 0 5 0',
								xtype		: 'lookupfield',
								name		: 'line_clos',
								editable	: false,
								labelWidth	: 101,
								width		: 201,
								lookupValue	: resource.lookup('search_all' ).concat( resource.lookup('line_clos' )),
								value		: ''
							}
						]
					},{	xtype : 'fieldset',
							layout: 'hbox',
							width : 1200,
							items : [
								{	fieldLabel	: Language.get('', '작업자' ),
									xtype		: 'popupfield',
									name		: 'user_name',
									pair		: 'drtr_idcd',
									editable	: true,
									enableKeyEvents : true,
									labelWidth	: 70,
									width		: 180 ,
									clearable	: true,
									popup		: {
										widget	: 'lookup-user-popup',
										select	: 'SINGLE',
										params	: { stor_grp : _global.stor_grp  },
										result	: function(records, nameField, pairField ){
											nameField.setValue(records[0].get('user_name'));
											pairField.setValue(records[0].get('user_idcd'));
										}
									}
								},{	name : 'drtr_idcd', xtype : 'textfield' , hidden : true
								},{	fieldLabel	: Language.get('', '공정' ),
									name		: 'wkct_name',
									pair		: 'wkct_idcd',
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									emptyText	: '',
									labelWidth	: 40,
									width		: 154 ,
									clearable	: true,
									popup		: {
										widget	: 'lookup-wkct-popup',
										select	: 'SINGLE',
										params	: { stor_grp : _global.stor_grp, line_stat : '0' },
										result	: function(records, nameField, pairField ) {
											nameField.setValue(records[0].get('wkct_name'));
											pairField.setValue(records[0].get('wkct_idcd'));
										}
									}
								},{	name		: 'wkct_idcd', xtype : 'textfield', hidden : true
								},{	fieldLabel	: Language.get('', '불량처리구분'),
									xtype		: 'lookupfield',
									name		: 'poor_proc_dvcd',
									editable	: false,
									labelWidth	: 100,
									width		: 200,
									lookupValue	: resource.lookup('search_all').concat( resource.lookup('poor_proc_dvcd' )),
									value		: ''
								}
		 				]
		 			}
				]
			};
		return line;
		},
/**
* 라인1
*/

});