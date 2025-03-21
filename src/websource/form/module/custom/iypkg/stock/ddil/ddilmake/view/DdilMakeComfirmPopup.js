Ext.define('module.custom.iypkg.stock.ddil.ddilmake.view.DdilMakeComfirmPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-iypkg-ddilmake-comfirm-popup',

	title		: '결과등록',
	closable	: true,
	autoShow	: true,
	width		: 180 ,
	height		: 120,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);
		console.log(me.params.invc_date);
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
			itemId	: 'invc',
			margin	: '15 7 0 -10',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 240,
							fieldDefaults: { width : 100, labelWidth : 60, labelSeparator : '' },
							items		: [
								{	fieldLabel	: '반영일자',
									xtype		: 'datefield',
									name		: 'invc_date',
									width		: 160,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									required	: true,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
									value		: me.params.invc_date.substr(0,4).concat('-',me.params.invc_date.substr(4,2),'-',me.params.invc_date.substr(6,2))
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
			lister2	= Ext.ComponentQuery.query('module-iypkg-ddilmake-lister2')[0],
			records	= lister2.getStore(),
			values	= Ext.ComponentQuery.query('module-iypkg-ddilmake-search')[0].getValues(),
			invc_date	= me.down('form').getValues().invc_date
		;
		console.log();
		if(invc_date == '' || invc_date == null){
			Ext.Msg.alert("알림","조사일자를 입력하여 주시기 바랍니다.");
			return;
		}else{
			Ext.Msg.confirm("확인", "재고실사 결과를 수불부에 등록 하시겠습니까?", function(button) {
				if (button == 'yes') {
					Ext.Ajax.request({
						url		: _global.location.http() + '/custom/iypkg/stock/ddil/ddilmake/set/ddil.do',
						params	: {
							token	: _global.token_id,
							param	: JSON.stringify({
								wrhs_idcd		: values.wrhs_idcd?values.wrhs_idcd:'01',
								invc_date		: invc_date,
								invc_date2		: me.params.invc_date
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
								var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
								mask.show();
								lister2.select({
									 callback : function(records, operation, success) {
										if (success) {
										} else {}
										mask.hide();
									}, scope : me
								});
								me.hide();
							}
							Ext.Msg.alert("알림", "등록이 완료 되었습니다.");
							master.getStore().reload();
						},
						failure : function(result, request) {
						},
						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						}
					});
				}
			});
		}
	}
});
