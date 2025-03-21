Ext.define('module.custom.wontc.prod.order.workentry.view.WorkEntryEditor', { extend: 'Axt.form.Editor',
	alias		: 'widget.module-wontc-workentry-editor',
	layout : {
		type: 'border'
	},
	columnLines : true,
	initComponent: function(){
		var me = this;
		me.dockedItems = [ me.createwest() ] ;
//		me.items = me.createTabs();
//		me.items = me.createwest();
		me.callParent()  ;
	},


	createwest : function () {
		var me = this,
			item = {
				xtype			: 'form-panel',
				margin			: '0 0 0 0',
				layout			: 'hbox',
				minWidth		: 930,
				autoScroll		: true,
				bodyStyle		: { padding: '4px' },
				items : [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, flex : 1, margin : '0 0 0 5',
						items	: [
							{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0, margin : '0 0 0 0', width : '100%',
								items	: [
									{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0', width : '100%', minWidth : 975,
										items	: [
											{	xtype	: 'fieldcontainer'  ,
												layout	: { type: 'vbox', align: 'stretch' } ,
												style	: Const.borderLine.top  + Const.borderLine.left + Const.borderLine.right,
												width	: 110,
												height	: 33,
												margin	: '0 0 2 0',
												items	: [
													{	text	: '수주건명', xtype : 'label', style : 'text-align:center; font-size : 1.2em !important;border-bottom : none !important;', margin : '8 0 0 0'
													}
												]
											},{	xtype	: 'fieldcontainer'  ,
												layout	: { type: 'vbox', align: 'stretch' } ,
												width	: 310,
												height	: 35,
												margin	: '0 0 0 0',
												items	: [
													{	xtype		: 'textfield',
														name		: 'modl_name',
														height		: 35,
														readOnly	: true,
														fieldStyle	: 'font-size:1.2em !important; text-align : left; font-weight:bold; border-color : #99bce8; border-left : none !important;border-right : none !important;',
													}
												]
											},{	xtype	: 'fieldcontainer'  ,
												layout	: { type: 'vbox', align: 'stretch' } ,
												style	: Const.borderLine.top  + Const.borderLine.left + Const.borderLine.right + Const.borderLine.bottom,
												width	: 110,
												height	: 33,
												margin	: '0 0 2 0',
												items	: [
													{	text	: '수주처', xtype : 'label', style : 'text-align:center; font-size : 1.2em !important;', margin : '8 0 0 0'
													}
												]
											},{	xtype	: 'fieldcontainer'  ,
												layout	: { type: 'vbox', align: 'stretch' } ,
												width	: 310,
												height	: 35,
												margin	: '0 0 0 0',
												items	: [
													{	xtype		: 'textfield',
														readOnly	: true,
														name		: 'cstm_name',
														height		: 35,
														fieldStyle	: 'font-size:1.2em !important; text-align : left; font-weight:bold; border-color : #99bce8; border-left : none !important; ',
													}
												]
											},
										]
									},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0', width : '100%', minWidth : 975,
										items	: [
											{	xtype	: 'fieldcontainer'  ,
												layout	: { type: 'vbox', align: 'stretch' } ,
												style	: Const.borderLine.top  + Const.borderLine.left + Const.borderLine.right + Const.borderLine.bottom,
												width	: 110,
												height	: 33,
												margin	: '0 0 0 0',
												items	: [
													{	text	: '품명', xtype : 'label', style : 'text-align:center; font-size : 1.2em !important;border-top : none !important;', margin : '8 0 0 0'
													}
												]
											},{	xtype	: 'fieldcontainer'  ,
												layout	: { type: 'vbox', align: 'stretch' } ,
												width	: 310,
												height	: 35,
												margin	: '0 0 0 0',
												items	: [
													{	xtype		: 'textfield',
														name		: 'item_name',
														height		: 35,
														readOnly	: true,
														fieldStyle	: 'font-size:1.2em !important; text-align : left; font-weight:bold; border-color : #99bce8;border-left : none !important; border-right : none !important; border-top : none !important;',
													}
												]
											},{	xtype	: 'fieldcontainer'  ,
												layout	: { type: 'vbox', align: 'stretch' } ,
												style	:  Const.borderLine.left + Const.borderLine.right + Const.borderLine.bottom,
												width	: 110,
												height	: 34,
												margin	: '0 0 2 0',
												items	: [
													{	text	: '수주일자', xtype : 'label', style : 'text-align:center; font-size : 1.2em !important;border-top : none !important;', margin : '8 0 0 0'
													}
												]
											},{	xtype	: 'fieldcontainer'  ,
												layout	: { type: 'vbox', align: 'stretch' } ,
												width	: 100,
												height	: 35,
												margin	: '0 0 0 0',
												items	: [
													{	xtype		: 'textfield',
														readOnly	: true,
														name		: 'invc_date',
														height		: 35,
														fieldStyle	: 'font-size:1.2em !important; text-align : left; font-weight:bold; border-color : #99bce8;  border-left : none !important; border-right : none !important;border-top : none !important;',
													}
												]
											},{	xtype	: 'fieldcontainer'  ,
												layout	: { type: 'vbox', align: 'stretch' } ,
												style	: Const.borderLine.left +  Const.borderLine.bottom,
												width	: 110,
												height	: 34,
												margin	: '0 0 2 0',
												items	: [
													{	text	: '납기일자', xtype : 'label', style : 'text-align:center; font-size : 1.2em !important;border-top : none !important;important;border-right : none !important;', margin : '8 0 0 0'
													}
												]
											},{	xtype	: 'fieldcontainer'  ,
												layout	: { type: 'vbox', align: 'stretch' } ,
												width	: 100,
												height	: 35,
												margin	: '0 0 0 0',
												items	: [
													{	xtype		: 'textfield',
														readOnly	: true,
														name		: 'deli_date',
														height		: 35,
														fieldStyle	: 'font-size:1.2em !important; text-align : left; font-weight:bold; border-color : #99bce8;border-top : none !important;',
													}
												]
											},{	xtype	: 'fieldcontainer'  ,
												layout	: { type: 'vbox', align: 'stretch' } ,
												width	: 175,
												height	: 35,
												margin	: '0 0 0 0',
												items	: [
													{	xtype	: 'fieldcontainer', layout: 'hbox' ,padding:'0', border: 1, width : 250, margin : '0 0 0 0',
														height	: 34,
														items	: [
															{	text		: '<span class="btnTemp" style="font-size:1.8em">도면확인</span>',
																xtype		: 'button',
																width		: 150,
																height		: 30,
																margin		: '2 0 10 10',
																cls			: 'button-style',
																listeners	: {
																	click : function(){
																		me.image();
																	}
																}
															}
														]
													}
												]
											}
										]
									},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0', width : '100%', minWidth : 975,
										items	: [
											,{xtype : 'textfield', name : 'invc_numb', hidden : true
											},{xtype : 'textfield', name : 'amnd_degr', hidden : true
											},{xtype : 'textfield', name : 'line_seqn', hidden : true
											},{xtype : 'textfield', name : 'pror_numb', hidden : true
											},{xtype : 'textfield', name : 'wkod_seqn', hidden : true
											},{xtype : 'textfield', name : 'cstm_idcd', hidden : true
											},{xtype : 'textfield', name : 'item_idcd', hidden : true
											},{xtype : 'textfield', name : 'item_name', hidden : true
											},{xtype : 'textfield', name : 'invc_qntt', hidden : true
											},{xtype : 'textfield', name : 'item_leng', hidden : true
											},{xtype : 'textfield', name : 'item_widh', hidden : true
											},{xtype : 'textfield', name : 'mtrl_name', hidden : true
											},{xtype : 'textfield', name : 'drwg_numb', hidden : true
											},{xtype : 'textfield', name : 'revs_numb', hidden : true
											},{xtype : 'textfield', name : 'invc_qntt', hidden : true
											},{xtype : 'textfield', name : 'search_val', hidden : true
											}
										]
									}
								]
							},
						]
					}
				]
			}
		;
		return item;
	},

	image : function(){
		var me = this,
			myform = Ext.ComponentQuery.query('module-wontc-workentry-editor')[0],
			check = '1',
			resId = _global.hq_id.toUpperCase()
		;

		var jrf = 'hjsys_draw.jrf';
		var a = "";
		for(var i =0; i< 1 ; i++){
			if(i==0){
				a += "[";
			}
				a+= '{\'invc_numb\':\''+myform.getForm().getValues().invc_numb+'\',\'line_seqn\':\''+myform.getForm().getValues().line_seqn+'\'}';
				a+="]";
		}

		var _param = '_param~{\'dvcd\':1,\'records\':'+a+'}~';
		var arg = _param;
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var win =  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800')
		return;
	},


	/**
	 *
	 */
	createTabs : function () {
		var me = this,
			tabs = {
				xtype	: 'tabpanel',
				region	: 'center',
				plain	: true,
				margin	: 0 ,
				items	: [ me.createTab1() ]
			}
		;
		return tabs;
	},


	/**
	 *
	 */
//	createTab1 : function() {
//		var item = {
//			title 			: '메모사항',
//			xtype 			: 'form-panel',
//			region			: 'west',
//			border			: 0,
//			bodyStyle		: { padding: '5px' },
//			fieldDefaults	: { width : 315, labelWidth : 50, labelSeparator : '' },
//			items			: [
//				{	xtype	: 'fieldset',
//					layout	: 'vbox' ,
//					padding	: '0',
//					border	: 0,
//					margin	: '0 0 5 0',
//					items	: [
//						{	xtype		: 'textarea',
//							name		: 'user_memo',
//							height		: 45,
//							width		: '100%',
//							readOnly	: true,
//							fieldCls	: 'readonlyfield',
//							maxLength	: 100,
//							maxLengthText: '한글 100자 이내로 작성하여 주십시오.',
//							fieldStyle	: 'font-size:1.2em !important;',
//						}
//					]
//				}
//			]
//		}
//	;
//	return item;
//	}
});