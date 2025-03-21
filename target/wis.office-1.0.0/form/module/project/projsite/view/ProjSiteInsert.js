/**
 */
Ext.define('module.project.projsite.view.ProjSiteInsert', { extend: 'Axt.popup.Search',

	alias: 'widget.module-projsite-insert',

	title: '프로젝트 선택' ,
	closable: true,
	autoShow: true,
	width: 400,
	height: 180,
	layout: {
		type: 'border'
	},
	matcode : undefined,
	matname : undefined,
	defaultFocus : 'initfocused',
	initComponent: function(config){
		var me = this;
		me.items = [me.createForm()];
		me.callParent(arguments);
	},
	/**
	 * 화면폼
	 */

	createForm: function(){
		var me = this,
			form = {
			xtype		: 'form-panel',
			region		: 'center',
			border		: false,
			dockedItems	: [
				{	xtype	: 'toolbar',
					dock	: 'bottom',
					items	: [
						'->' ,
						{	xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
						{	xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }
					]
				}
			],
			items : [ me.editorForm() ]
		};
		return form;
	},

	editorForm : function () {
		var me = this,
			form = {
				xtype	: 'form-panel',
				border	: false,
				padding	: 10 ,
				layout	: { type: 'vbox', align: 'stretch' } ,
				items	: [
					{	xtype	: 'label'   , text : '1.적용할 프로젝트 정보를 입력 하여 주시기 바랍다.' , margin : '0 0 3 0'
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'pjt_nm',
								pair		: 'pjt_id',
								value		: 'WIS MES 기본환경',
								width		: 155,
								allowBlank	: true,
								clearable	: false,
								fieldCls	: 'requiredindex',
								popup		: {
									widget	: 'lookup-projinfo-popup',
									select	: 'SINGLE',
									params	: { pjt_gb : [1000], row_sts : 0 },
									result	: function(records, nameField, pairField ){
										nameField.setValue(records[0].get('pjt_nm'));
										pairField.setValue(records[0].get('pjt_id'));
									}
								}
							},{ name		: 'pjt_cd'  ,
								xtype		: 'textfield',
								width		: 110 ,
								margin		: '0 0 0 5',
								readOnly	: true ,
								fieldCls	: 'readonlyfield',
								value		: 'common'
							},{ name		: 'pjt_id'  ,
								xtype		: 'textfield',
								width		: 92 ,
								margin		: '0 0 0 5',
								readOnly	: true ,
								fieldCls	: 'readonlyfield',
								value		: '14821'
							}
						]
					},{	xtype		: 'label'     , text : '2.본사 코드 10자리를 입력 하여 주시기 바랍니다.' , margin : '5 0 3 0'
					},{	xtype		: 'textfield' ,
						name		: 'hq_id' ,
						width		: 100,
//    				minLength : 10  ,
//    				maxLength : 10  ,
//    				vtype : 'bonsa'
					//maskRe : /^PE[0-9]{3}\.[0-9]{3}$/
					//maskRe    : /^PE[A-Z]{1}\[0-9]{4}$/,
					//regex     : /[A-Z0-9]+/
				}
				//N 0000 XONDS


			]
		};
		return form;
	},

	/**
	 * 확인 버튼 이벤트
	 */
	finishAction: function(){
		var me     = this,
			editor = me.down('form'),
			record = editor.getValues(),
			hq_id = Ext.String.trim(record.hq_id)
		;
		if (editor.getForm().isValid()){
//        	if (hq_id.length != 10) {
//            	resource.showError( '본사 코드를 올바르게 입력 하여 주시기 바랍니다.' );
//            	return ;
//            } else {
				record.hq_grp = hq_id;
				record.hq_id  = hq_id;
				me.setResponse(record);
//            }
		} else {
			Ext.Msg.alert(Const.ERROR, Const.invalid.inputValue );
		}
	}
});
