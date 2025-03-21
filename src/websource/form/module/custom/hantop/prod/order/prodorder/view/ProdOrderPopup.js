Ext.define('module.custom.hantop.prod.order.prodorder.view.ProdOrderPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-prodorder-popup',

	title		: '작업지시서 발행',
	closable	: true,
	autoShow	: true,
	width		: 260 ,
	height		: 135,
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
						{	text : '<span class="write-button">발행</span>', scope: me,handler: me.callAction, cls: 'button-style'} ,
						{	text : '<span class="write-button">닫기</span>', scope: me, handler: me.close, cls: 'button-style'} ,
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
					layout	: 'vbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 240,
							fieldDefaults: { width : 100, labelWidth : 60, labelSeparator : '' },
							items		: [
								{	fieldLabel	: Language.get('chk','발행양식'),
									xtype		: 'lookupfield',
									name		: 'chk',
									itemId		: 'chk',
									editable	:  false,
									labelWidth	: 80,
									width		: 220,
									lookupValue	: [['1','표준 양식'],['2','MC 양식'],['3','MF보강재 양식'],['4','SF보강재 양식'],['5','BF보강재 양식'],['6','자재별 작업지시서']],
									listeners	: {
										change	:function(){
											var	val = this.getValue(),
												auto = me.down('[name=auto_yorn]')
											;
											if(val == '1'){
												auto.show();
											}else{
												auto.hide();
											}
										}
									}
								}
							]
						},{	xtype		: 'form-panel',
							border		: 0,
							width		: 240,
							fieldDefaults: { width : 100, labelWidth : 60, labelSeparator : '' },
							items		: [
								{	fieldLabel	: Language.get('auto_yorn','자동여부'),
									xtype		: 'lookupfield',
									name		: 'auto_yorn',
									itemId		: 'auto_yorn',
									editable	:  false,
									labelWidth	: 80,
									width		: 220,
									lookupValue	: [['3','전체'],['1','예'],['0','아니오']]
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
	 * 발행 버튼 이벤트
	 */

	callAction: function(){
		var me = this,
			baseform= me.down('form'),
			values	= baseform.getValues(),
			master	= Ext.ComponentQuery.query('module-prodorder-lister-master')[0],
			select	= master.getSelectionModel().getSelection()[0],
			jrf ,
			resId = _global.hq_id.toUpperCase()
		;
		if (select) {
			var invc_numb = select.get('invc_numb');
			var arg =	'invc_numb~'+invc_numb+'~';
			switch (values.chk) {
			case '1': jrf='hntop_wpror2.jrf'; arg += 'auto_yorn~'+values.auto_yorn+'~'+'';
				break;
			case '2': jrf='hntop_wpror_mc.jrf';
				break;
			case '3': jrf='hntop_wpror_mfrn.jrf';
				break;
			case '4': jrf='hntop_wpror_sfrn.jrf';
				break;
			case '5': jrf='hntop_wpror_bfrn.jrf';
				break;
			case '6': jrf='hntop_wpror_material.jrf'; arg += 'auto_yorn~'+'1'+'~'+ 'item~';
			break;

			default: return;
				break;
			}
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800'),
			});
		}
	},
});
