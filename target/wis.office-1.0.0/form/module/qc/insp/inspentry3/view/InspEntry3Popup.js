Ext.define('module.qc.insp.inspentry3.view.InspEntry3Popup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-inspentry3-popup',

	title		: '검사실적 입력',
	closable	: true,
	autoShow	: true,
	width		: 580 ,
	height		: 300,
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
			itemId	: 'invc',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '10 0 0 0',
					items	: [
						{	fieldLabel	: '주문번호',
							name		: 'invc_numb',
							xtype		: 'textfield',
							itemId		: 'invc_numb',
							width		: 250,
							labelWidth	: 70,
							readOnly	: true
						},{ fieldLabel	: '거래처명',
							xtype		: 'textfield',
							name		: 'cstm_name',
							itemId		: 'cstm_name',
							width		: 250,
							labelWidth	: 70,
							readOnly	: true
						}
					]
				},{	xtype	: 'textfield', name : 'line_seqn', hidden : true, itemId : 'line_seqn'
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: '품목코드',
							name		: 'item_code',
							itemId		: 'item_code',
							xtype		: 'textfield',
							width		: 250,
							readOnly	: true
						},{	fieldLabel	: '입고수량',
							name		: 'istt_qntt',
							itemId		: 'istt_qntt',
							xtype		: 'numericfield',
							width		: 250,
							readOnly	: true,
						},{ name : 'item_idcd' , xtype:'textfield' , hidden:true , itemId		: 'item_idcd'}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: '품명/규격',
							name		: 'item_name',
							itemId		: 'item_name',
							xtype		: 'textfield',
							width		: 250,
							labelWidth	: 70,
							readOnly	: true
						},{ xtype		: 'textfield',
							name		: 'item_spec',
							itemId		: 'item_spec',
							width		: 200,
							readOnly	: true
						},{ xtype		: 'textfield',
							name		: 'unit_idcd',
							itemId		: 'unit_idcd',
							width		: 50,
							readOnly	: true
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: '검사방법',
							xtype		: 'lookupfield',
							name		: 'insp_mthd_dvcd',
							itemId		: 'insp_mthd_dvcd',
							editable	: false,
							width		: 250,
							labelWidth	: 70,
							lookupValue	: resource.lookup('insp_mthd_dvcd' )
						},{	fieldLabel	: '검사일자',
							xtype		: 'datefield',
							name		: 'insp_date',
							itemId		: 'insp_date',
							width		: 250,
							labelWidth	: 70,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: Ext.Date.add( new Date(), Ext.Date.DAY, +0),
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	:  '검사담당',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'insp_drtr_name',
							itemId		: 'insp_drtr_name',
							pair		: 'insp_drtr_idcd',
							width		: 250,
							labelWidth	: 70,
							clearable	: true,
							value		: _global.login_nm,
							popup		: {
								widget	: 'lookup-user-popup',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp },
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('user_name'));
									pairField.setValue(records[0].get('user_idcd'));
								}
							}
						},{	xtype		: 'textfield', name : 'insp_drtr_idcd', hidden : true, itemId : 'insp_drtr_idcd', value : _global.login_id
						},{	fieldLabel	: '검사수량',
							xtype		: 'numericfield',
							name		: 'insp_qntt',
							itemId		: 'insp_qntt',
							width		: 250,
							labelWidth	: 70,
							listeners	: {
								change : function(){
									var panel = this.up('form');
									var insp_qntt = panel.down('[name=insp_qntt]').getValue();
									var poor_qntt = panel.down('[name=poor_qntt]').getValue();

									var qntt = Number(insp_qntt)-Number(poor_qntt);
									if(qntt < 0){
										panel.down('[name=poor_qntt]').setValue(0);
										panel.down('[name=pass_qntt]').setValue(0);
									}else{
										panel.down('[name=poor_qntt]').setValue(poor_qntt);
										panel.down('[name=pass_qntt]').setValue(qntt);
									}
								},
							},
						},{	fieldLabel	: '검사수량',
							xtype		: 'numericfield',
							name		: 'dlvy_qntt',
							itemId		: 'dlvy_qntt',
							width		: 250,
							labelWidth	: 70,
							hidden		: true
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: '불량수량',
							xtype		: 'numericfield',
							name		: 'poor_qntt',
							itemId		: 'poor_qntt',
							width		: 250,
							labelWidth	: 70,
							enableKeyEvents: true ,
							listeners	: {
								change : function(){
									var panel = this.up('form');
									var insp_qntt = panel.down('[name=insp_qntt]').getValue();
									var poor_qntt = panel.down('[name=poor_qntt]').getValue();
									if(insp_qntt != null){
										var qntt = Number(insp_qntt)-Number(poor_qntt);
										if(qntt < 0){
											this.setValue(insp_qntt);
											panel.down('[name=pass_qntt]').setValue(0);
										}else{
											this.setValue(poor_qntt);
											panel.down('[name=pass_qntt]').setValue(qntt);
										}
									}else{
										this.setValue(0);
									}
								},
							},
						},{	fieldLabel	: '합격수량',
							xtype		: 'numericfield',
							name		: 'pass_qntt',
							itemId		: 'pass_qntt',
							width		: 250,
							labelWidth	: 70,
							readOnly	: true
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('poor_caus_name','불량사유'),			//temp
							width		: 250,
							labelWidth	: 70,
							itemId		: 'poor_caus_name',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'poor_caus_name',
							pair		: 'poor_caus_dvcd',
							allowBlank	: false,
							clearable	: false ,
							popup: {
								select : 'SINGLE',
								widget : 'lookup-base-popup',
								params : { stor_grp : _global.stor_grp , row_sts : '0',prnt_idcd:'6001' },
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('base_name'));
									pairField.setValue(records[0].get('base_code'));
								}
							},
							enableKeyEvents: true ,
						},{	name : 'poor_caus_dvcd', xtype : 'textfield' , hidden : true,
						},{	fieldLabel	: '판정',
							xtype		: 'lookupfield',
							name		: 'judt_dvcd',
							itemId		: 'judt_dvcd',
							editable	: false,
							width		: 250,
							labelWidth	: 70,
							lookupValue	: resource.lookup('judt_dvcd' )
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
			values	= baseform.getValues()
		;

		var a = me.down('[name=istt_qntt]').getValue(); //납품수량
		var s = me.down('[name=insp_qntt]').getValue(); //검사수량
		var d = me.down('[name=poor_qntt]').getValue(); //불량수량
		var e = me.down('[name=pass_qntt]').getValue(); //합격수량
		var f = me.down('[name=judt_dvcd]').getValue(); //판정

		if	(s > a){
			Ext.Msg.show({ title: '알림', msg: '검사수량이 납품수량보다 많을수없습니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
			return;
		}
		if	(d > a){
			Ext.Msg.show({ title: '알림', msg: '불량수량이 검사수량보다 많을수없습니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
			return;
		}
		if	( s== null || s=='' || s<0){
			Ext.Msg.show({ title: '알림', msg: '판정이 합격일경우 검사수량도 반드시 있어야합니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
		} else {
			if(f== null || f==''){
				Ext.Msg.show({ title: '알림', msg: '판정이  반드시 있어야합니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
			}else{
				if(f == '1'){
					if(e<0||e== null || e==''){
						Ext.Msg.show({ title: '알림', msg: '합격수량이  반드시 있어야합니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
					}else{
						Ext.Ajax.request({
							url		: _global.location.http() + '/qc/insp/inspentry3/set/insp.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									invc_numb		: values.invc_numb,
									line_seqn		: values.line_seqn,
									insp_date		: values.insp_date,
									insp_drtr_idcd	: values.insp_drtr_idcd,
									insp_qntt		: values.insp_qntt,
									poor_qntt		: values.poor_qntt,
									pass_qntt		: values.pass_qntt,
									poor_caus_dvcd	: values.poor_caus_dvcd,
									judt_dvcd		: values.judt_dvcd,
									istt_qntt		: values.istt_qntt,
									item_idcd		: values.item_idcd,
									stor_id			: _global.stor_id,
									hqof_idcd		: _global.hqof_idcd,
									insp_mthd_dvcd	: values.insp_mthd_dvcd,
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
									me.setResponse( {success : true , values :  values });
								}
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */

							}
						});
					}
				}else if( f == '2'){
					if( e  >0 ){
						Ext.Msg.show({ title: '알림', msg: '합격수량이  없어야합니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
					}else{
						me.setResponse( {success : true , values :  values });
						console.log(values);
						Ext.Ajax.request({
							url		: _global.location.http() + '/qc/insp/inspentry3/set/insp.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									invc_numb		: values.invc_numb,
									line_seqn		: values.line_seqn,
									insp_date		: values.insp_date,
									insp_drtr_idcd	: values.insp_drtr_idcd,
									insp_qntt		: values.insp_qntt,
									poor_qntt		: values.poor_qntt,
									pass_qntt		: values.pass_qntt,
									poor_caus_dvcd	: values.poor_caus_dvcd,
									judt_dvcd		: values.judt_dvcd,
									istt_qntt		: values.istt_qntt,
									stor_id			: _global.stor_id,
									hqof_idcd		: _global.hqof_idcd,
									insp_mthd_dvcd	: values.insp_mthd_dvcd,
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
									me.setResponse( {success : true , values :  values });
								}
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */

							}
						});
					}
				}
			}
		}
	},
});
