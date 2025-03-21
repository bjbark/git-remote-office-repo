Ext.define('module.custom.sjflv.stock.isos.goodsosttwork.view.GoodsOsttWorkItemPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-goodsosttwork-item-popup',

	title		: '부품식별표',
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
		console.log(me.param,'param');
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
						{	text : '<span class="write-button">확인</span>', scope: me, handler: me.confirmAction, cls: 'button-style'} ,
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
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 240,
							fieldDefaults: { width : 100, labelWidth : 60, labelSeparator : '' },
							items		: [
								{	fieldLabel	: Language.get('trst_qntt','지시수량'),
									xtype		: 'numericfield',
									name		: 'trst_qntt',
									itemId		: 'trst_qntt',
									readOnly	: true,
									labelWidth	: 80,
									value		: me.param.trst_qntt,
									width		: 220,
									format		: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.###',
								},{	fieldLabel	: Language.get('','포장수량'),
									xtype		: 'numericfield',
									name		: 'pkge_qntt',
									itemId		: 'pkge_qntt',
									labelWidth	: 80,
									width		: 220,
									format		: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.###',
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

	confirmAction: function(){
		var me = this,
			baseform= me.down('form'),
			values	= baseform.getValues(),
			param	= me.param,
			jrf = 'Kitec_ItemTag.jrf',
			resId = _global.hq_id.toUpperCase()
			;
		var spts_numb = param.invc_numb,
			spts_seqn = param.line_seqn,
			qntt1 = values.trst_qntt,
			qntt2 = values.pkge_qntt,
			qntt3 = 0
		;
		var arg =	'spts_numb~'+spts_numb+'~spts_seqn~'+spts_seqn+'~qntt1~'+qntt1+'~qntt2~'+qntt2+'~qnttr~'+qntt3+'~';
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';

		Ext.Ajax.request({
			url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800'),
		});
	},

});
