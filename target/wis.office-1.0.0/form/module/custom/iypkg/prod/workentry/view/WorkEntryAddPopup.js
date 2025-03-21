Ext.define('module.custom.iypkg.prod.workentry.view.WorkEntryAddPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-workentry-add-popup',

	title		: '일괄등록',
	closable	: true,
	autoShow	: true,
	width		: 260 ,
	height		: 130,
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
			margin	: '18 7 0 10',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 370,
							fieldDefaults: { width : 300, labelWidth : 60, labelSeparator : '' },
							items		: [
								{ fieldLabel	: '작업일자',
									xtype		: 'datefield',
									name		: 'invc_date',
									width		: 200,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									value		: new Date()
								}
							]
						}
					]
				}
			]
		};
		return form;
	},

	finishAction: function(){
		var me = this,
			baseform= me.down('form'),
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			master	= Ext.ComponentQuery.query('module-workentry-master3')[0]
		;
		if(values.invc_date==''||values.invc_date==null){
			Ext.Msg.alert("알림","작업일자를 반드시 입력해주십시오.");
		}else{
			Ext.Msg.confirm("확인", "일괄등록 하시겠습니까?", function(button) {
				if (button == 'yes') {
					var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.UPDATE.mask });
					mask.show();

					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/prod/workentry/set/writeAll.do',
						method		: "POST",
						params		: {
							token	: _global.token_id,
							param	: JSON.stringify({
								records		: me.popup.params.invc_numb,
								invc_date	: values.invc_date,
								stor_id		: _global.stor_id,
								hqof_idcd	: _global.hqof_idcd
							})
						},
						success : function(response, request) {
							var object = response,
								result = Ext.decode(object.responseText)
							;
							if (result.success) {
							} else {
								Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
							}
						},
						failure : function(response, request) {
							resource.httpError(response);
						},
						callback : function() {
							me.setResponse();
							master.getStore().reload();
						}
					});
				}
			});
		}
	}
});
