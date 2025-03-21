Ext.define('module.custom.sjflv.sale.export.ordermast2.view.OrderMast2SkedPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-ordermast2-sked-popup',

	title		: '일정 등록',
	closable	: true,
	autoShow	: true,
	width		: 700 ,
	height		: 150,
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
						{ xtype: 'button' , text : Const.UPDATE.text, iconCls: Const.UPDATE.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
					]
				}
			],
			items : [me.editorForm() ]
		};
		return form;
	},

	editorForm : function () {
		var	me	= this,
			form = {
				xtype		: 'form-panel' ,
				bodyStyle	: { padding: '5px' },
				flex		: 1 ,
				height		: 400,
				fieldDefaults	: { width : 200, labelWidth : 80, labelSeparator : '' , },
				items			: [
					{	xtype : 'fieldset', layout: 'vbox', border		: 0,
						items : [
							{	xtype : 'fieldset', layout: 'hbox', border		: 0,margin		: '5 0 0 5',
								items : [
									{	fieldLabel	: Language.get('', 'Order No' ),
										xtype		: 'textfield',
										name		: 'ordr_numb',
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										value		: me.params.ordr_numb?me.params.ordr_numb:''
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border		: 0,margin		: '5 0 0 5',
								items : [
									{	fieldLabel	: Language.get('','공장픽업일'),
										xtype		: 'datefield',
										name		: 'ostt_schd_date',
										format		: Const.DATE_FORMAT_YMD_BAR,
										submitFormat: Const.DATE_FORMAT_YMD,
										value		: me.params.ostt_schd_date?me.params.ostt_schd_date:'',
										//readOnly	: (me.params.cofm_yorn == '1'? true : false)
									},{	fieldLabel	: Language.get('','출발일'),
										xtype		: 'datefield',
										name		: 'etdd',
										format		: Const.DATE_FORMAT_YMD_BAR,
										submitFormat: Const.DATE_FORMAT_YMD,
										value		: me.params.etdd?me.params.etdd:''
									},{	fieldLabel	: Language.get('','도착일'),
										xtype		: 'datefield',
										name		: 'etaa',
										format		: Const.DATE_FORMAT_YMD_BAR,
										submitFormat: Const.DATE_FORMAT_YMD,
										value		: me.params.etaa?me.params.etaa:''
									},{	fieldLabel	: Language.get('',''),
										xtype		: 'textfield',
										name		: 'item_idcd',
										hidden		: true,
										value		: me.params.item_idcd,
									},{	fieldLabel	: Language.get('',''),
										xtype		: 'textfield',
										name		: 'cofm_yorn',
										hidden		: true,
										value		: me.params.cofm_yorn?me.params.cofm_yorn:'0',
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
			master	= Ext.ComponentQuery.query('module-sjflv-export-ordermast2-lister-master')[0]
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();

		Ext.Ajax.request({
			url			: _global.api_host_info + '/' + _global.app_site + '/custom/sjflv/sale/export/ordermast2/set/sced.do',
			method		: "POST",
			params		: {
				token	: _global.token_id,
				param	: Ext.encode(values)
			},
			async : false,
			success : function(response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
				me.setResponse( {success : true});
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
				master.getStore().reload();
			},
			finished : function(results, record, operation){
				mask.hide();
			}
		});
	}
});
