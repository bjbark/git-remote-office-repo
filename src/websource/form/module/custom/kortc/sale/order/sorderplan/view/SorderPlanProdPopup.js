Ext.define('module.custom.kortc.sale.order.sorderplan.view.SorderPlanProdPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-sorderplan-prod-popup',

	title		: '진행계획 등록',
	closable	: true,
	autoShow	: true,
	width		: 500 ,
	height		: 602 ,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'clnt_name',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm() ];
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
			items : [ me.editorForm() ,  me.searchForm() , {xtype:'module-sorderplan-lister-detail4'} ]
		};
		return form;
	},

	editorForm : function () {
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			itemId	: 'popup_editor1',
			margin	: '15 7 0 -10',
			layout	: { type: 'vbox', align: 'stretch' } ,
			height		: 260 ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 640,
							fieldDefaults: { width : 300, labelWidth : 60, labelSeparator : '', margin : '0 0 0 60'},
							items		: [
								{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '5 0 0 5',
									items : [
										{	fieldLabel	: Language.get('acpt_numb', '주문번호' ),
											xtype		: 'textfield',
											name		: 'invc_numb',
											itemId		: 'invc_numb',
											width		: 150,
											readOnly	: true
										},{	fieldLabel	: Language.get('', 'amd' ),
											xtype		: 'numericfield',
											name		: 'amnd_degr',
											itemId		: 'amnd_degr',
											hidden		: true
										},{	fieldLabel	: Language.get('', '항번' ),
											xtype		: 'numericfield',
											name		: 'line_seqn',
											itemId		: 'line_seqn',
											hidden	: true
										}
									]
								},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
									items : [
										{	fieldLabel	: Language.get('cstm_name', '거래처명' ),
											name		: 'cstm_name',
											itemId		: 'cstm_name',
											xtype		: 'textfield',
											width		: 310,
											readOnly	: true
										}
									]
								},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
									items : [
										{	fieldLabel	: Language.get('cstm_name', '주문명' ),
											xtype		: 'textfield',
											name		: 'acpt_case_name',
											itemId		: 'acpt_case_name',
											width		: 310,
											readOnly	: true
										}
									]
								},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
									items : [
										{	fieldLabel	: Language.get('sale_drtr_name', '영업담당자' ),
											xtype		: 'textfield',
											name		: 'drtr_name',
											itemId		: 'drtr_name',
											width		: 150,
											readOnly	: true
										}
									]
								},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
									items : [
										{	fieldLabel	: Language.get('esti_date', '주문일자' ),
											name		: 'invc_date',
											xtype		: 'datefield',
											itemId		: 'invc_date',
											width		: 150,
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											readOnly	: true
										},{	name : 'modi_yorn', xtype	: 'textfield', hidden : true, value : 'n'
										}
									]
								},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '15 0 0 5',
									items : [
										{	fieldLabel	: Language.get('', '품목코드' ),
											name		: 'item_code',
											xtype		: 'textfield',
											itemId		: 'item_code',
											width		: 310,
											readOnly	: true
										},{ xtype:'textfield',name:'item_idcd',hidden:true
										}
									]
								},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
									items : [
										{	fieldLabel	: Language.get('', '품명' ),
											name		: 'item_name',
											itemId		: 'item_name',
											xtype		: 'textfield',
											width		: 310,
											readOnly	: true
										}
									]
								},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
									items : [
										{	fieldLabel	: Language.get('', '규격' ),
											name		: 'item_spec',
											itemId		: 'item_spec',
											xtype		: 'textfield',
											width		: 310,
											readOnly	: true
										}
									]
								},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '4 0 0 5',
									items : [
										{	fieldLabel	: Language.get('', '주문수량' ),
											name		: 'invc_qntt',
											itemId		: 'invc_qntt',
											xtype		: 'numericfield',
											width		: 150,
											readOnly	: true
										},{	fieldLabel	: Language.get('', '납기일자' ),
											name		: 'deli_date',
											itemId		: 'deli_date',
											xtype		: 'datefield',
											labelWidth	: 70,
											width		: 150,
											margin		: '0 0 0 10',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											readOnly	: true
										}
									]
								}
							]
						}
					]
				}
			],
		};
		return form;
	},

	searchForm: function(){
		var me = this,
			form = {
			xtype		: 'form-search',
			itemId		: 'popup_editor2',
			region		: 'north',
			bodyStyle	: { padding: '0', background: 'transparent' },
			layout: { type: 'vbox' },
			items :	[
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 58',
					items	: [
						{	fieldLabel	: Language.get('sale_drtr_name', '담당자' ),
							name		: 'sale_drtr_name',
							pair		: 'drtr_idcd',
							xtype		: 'popupfield',
							width		: 165,
							labelWidth	: 65,
							editable	: true,
							enableKeyEvents : true,
							clearable	: true,
							popup		: {
								widget	: 'lookup-user-popup',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp, line_stat : '0' },
								result	: function(records, nameField, pairField ) {
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
								}
							}
						},{name : 'drtr_idcd', xtype	: 'textfield', hidden : true
						},{name : 'crte_idcd', xtype	: 'textfield', hidden : true, value:_global.login_pk
						},
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 58',
					items	: [
						{	fieldLabel	: Language.get('', '자재조달일자' ),
							name		: 'mtrl_spdt',
							xtype		: 'datefield',
							width		: 165,
							labelWidth	: 65,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 40 5 58',
					items	: [
						{	fieldLabel	: Language.get('stwk_schd_date','작업계획'),
							xtype		: 'betweenfield',
							name		: 'stwk_schd_date',
							pair		: 'endd_schd_date',
							labelWidth	: 65,
							width		: 165,
							root		: true,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD
						},{	xtype		: 'betweenfield',
							fieldLabel	:'~',
							name		: 'endd_schd_date',
							pair		: 'stwk_schd_date',
							labelWidth	: 15,
							width		: 115,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD
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
			editor1 = me.down('[itemId=popup_editor1]'),
			editor2 = me.down('[itemId=popup_editor2]'),
			values1	= editor1.getValues(),
			values2	= editor2.getValues(),
			editor_merge,
			detail4	= Ext.ComponentQuery.query('module-sorderplan-lister-detail4')[0],
			store	= detail4.getStore()
		;
		if(values2.drtr_idcd==''||values2.drtr_idcd==null){
			Ext.Msg.alert("알림","담당자를 반드시  입력해주십시오.");
			return;
		};
		if(values2.mtrl_spdt==''||values2.mtrl_spdt==null){
			Ext.Msg.alert("알림","자재조달일자를 반드시  입력해주십시오.");
			return;
		};
		if(values2.stwk_schd_date==''||values2.stwk_schd_date==null){
			Ext.Msg.alert("알림","작업계획 시작일을 반드시  입력해주십시오.");
			return;
		};
		if(values2.endd_schd_date==''||values2.endd_schd_date==null){
			Ext.Msg.alert("알림","작업계획 종료일을 반드시  입력해주십시오.");
			return;
		};

		var arr = new Array();
		store.each(function(record){
			arr.push(record);
		})

		editor_merge = Ext.merge(values1,values2,{records:arr});


		Ext.Ajax.request({
    		url     :  _global.api_host_info + "/system/custom/kortc/sale/order/sorderplan/set/popup.do",// _global.api_host_info + '/' + _global.api_path + '/user/userinfo/set/changepasswd.do',
    		params  : {
    			token : _global.token_id,
    			param : JSON.stringify(editor_merge)
    		},
    		async  : false,
    		method  : 'POST',
    		success : function(response, request) {
    			var result = Ext.decode(response.responseText);
    			if ( !result.success ){
    				Ext.Msg.alert('알림',  result.message );
    				return;
    			} else {
    				me.close();
    			}
    		},
    		failure : function(result, request) {
    		}
    	} );

	}
});
