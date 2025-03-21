Ext.define('module.prod.order.otodwork.view.OtodWorkPopup', { extend: 'Axt.popup.Upload',
	alias		: 'widget.module-otodwork-popup'			,

	title: '자재출고',

	closable: true,
	autoShow: true,
	width: 380,
	height: 105,
	layout: {
		type: 'border'
	},

	waitMsg : Const.INSERT.mask,

	defaultFocus : 'initfocused',

	/**
	* component 초기화
	*/
	initComponent: function(config){
		var me = this;
		if (!me.popup.values){ me.popup.values ={}; }
		if (!me.popup.option){ me.popup.option ={}; }

		me.items = [me.createForm()];
		me.callParent(arguments);
	},

	createForm: function(){
		var me = this, form =
		{
			xtype		: 'form-panel',
			region		: 'center',
			border		:  false,
			dockedItems	:
			[
				{
					xtype	: 'toolbar',
					dock	: 'bottom',
					items	:
					[
						'->' ,
						{xtype : 'button' , text : '<span style="color:white">확인</span>' , iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
						{xtype : 'button' , text : '<span style="color:white">닫기</span>'  , iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style'}
					]
				}
			],
			items : [ me.editorForm() ]
		};
		return form;
	},



	/**
	 * form 생성
	 */
	editorForm: function(){
		var me = this;
		var form =
		{
			xtype	:'form-panel' ,
			region	:'center',
			layout	: 'border',
			border	: false,
			layout	: 'vbox',
			defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '10 0 5 0', padding: '0', border: 0 , },
			fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
			items			: [
				{	xtype : 'fieldset', layout: 'hbox',
					items	:
					[
						{	fieldLabel	: Language.get('mtrl_ostt_date','자재출고일자'),
							xtype		: 'datefield',
							name		: 'mtrl_ostt_date',
							editable	: false,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: new Date()
						}
					]
				}
			]
		}
		return form;
	},

	/**
	 *
	 */
	finishAction : function (button) {
		var me = this;
		var master = Ext.ComponentQuery.query('module-otodwork-lister-master')[0].getStore();
		var detail = Ext.ComponentQuery.query('module-otodwork-lister-detail')[0].getStore();
		var popup = Ext.ComponentQuery.query('module-otodwork-popup')[0];
		var mtrl_ostt_date = popup.down('[name=mtrl_ostt_date]').getValue();
		var records = me.popup.params.records;

		if(mtrl_ostt_date != null){
			for(var i=0;i<records.length;i++){
				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/prod/project/otodwork/set/ostt.do',
					method		: "POST",
					params		: {
						token	: _global.token_id,
						param	: Ext.encode({
							invc_numb		: records[i].get('invc_numb'),
							mtrl_ostt_date	: Ext.Date.format(new Date(mtrl_ostt_date), 'Ymd')
						})
					},
					success : function(response, request) {
						var object = response,
							result = Ext.decode(object.responseText)
						;
						me.close();
						Ext.Msg.alert("알림", "자재출고가 완료 되었습니다.");
						master.reload();
					},
					failure : function(response, request) {
						resource.httpError(response);
					},
					callback : function() {
						master.loadData([],true);
						detail.loadData([],false);
					}
				});
			}
		}else{
			Ext.Msg.alert("알림", "자재출고일자를 선택하여 주십시오.");
		}
	}
});