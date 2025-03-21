Ext.define('module.custom.iypkg.stock.isos.sptsmast.view.SptsMastPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-sptsmast-popup',

	title		: '출하계획일자 입력',
	closable	: true,
	autoShow	: true,
	width		: 220 ,
	height		: 120,
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
		var me   = this,
			form = {
				xtype		: 'form-panel',
				region		: 'center',
				border		: false,
				dockedItems	: [
					{	xtype : 'toolbar',
						dock  : 'bottom',
						items : [
							'->' ,
							{ xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.printAction,cls: 'button-style'},'-',
							{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
						]
					}
				],
				items : [me.editorForm() ]
		};
		console.log(me);
		return form;
	},

	editorForm : function () {
		var me   = this,
			form = {
					xtype		: 'form-panel',
					border		: false,
					layout		: { type: 'vbox', align: 'stretch' } ,
					items		: [
						{	xtype  : 'panel',
							border : 0,
							margin : '10 0 0 0',
							items  : [
								{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,
									items : [
										{	fieldLabel  : Language.get('','출하계획'),
											xtype       : 'datefield',
											name        : 'invc_date',
											labelWidth  : 50,
											width		: 150,
											margin		: '2 0 0 10',
											allowBlank  : false,
											editable    : false,
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD
										}
									]
								}
							]
						}
					],
			};
		return form;
	},

		/**
		 * 확인 버튼 이벤트
		 */
	printAction:function(){
		var me = this,
			baseform= me.down('form'),
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			jrf   = 'daea_Spts_List.jrf',
			resId = _global.hq_id.toUpperCase()
		;

		if(values.invc_date==''||values.invc_date==null){
			Ext.Msg.alert("알림","날짜를 선택해주십시오.")
			return;
		}

		var arg =	  'invc_date~'+values.invc_date+'~'
		;
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800');
	},
	});
