Ext.define('module.project.storeinfo.view.StoreInfoInsert', { extend: 'Axt.popup.Search',

    alias: 'widget.module-storeinfo-insert',

    title: '사업장 등록' ,
    closable: true,
    autoShow: true,
    width   : 400,
    height  : 350,
    layout  : {
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
    	var me = this, form =
    	{
    		xtype      : 'form-panel',
    		region     : 'center',
    		border     :  false,
    		dockedItems: [
    		 	{
    		 		xtype : 'toolbar',
    		 		dock  : 'bottom',
    		 		items : [
 		 		 		{xtype: 'button' , text : '엑셀 대량 업로드', iconCls: Const.EXPORT.icon , scope: me, handler: me.uploadAction, cls: 'button-style'},'-',
    		 		 	'->' ,
    		 		 	{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
    		 		 	{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close , cls: 'button-style'}
       		 		]
    		 	}
    	 	],
    	 	items : [ me.editorForm() ]
    	};
    	return form;
    },

    editorForm : function () {
    	var me = this, editor =
    	{
    		xtype	: 'form-panel',
    		border	:  false,
    		padding : 10 ,
    		layout	: { type: 'vbox', align: 'stretch' } ,
    		items	: [
    		 	{
    		 		xtype : 'label'     , text : '1. 등록할 청약서 유형을 선택 하여 주시기 바랍니다.' , margin : '0 0 3 0'
    		 	},{
    		 		name        : 'stor_gb'  ,
    		 		xtype       : 'lookupfield',
    		 		editable    : false,
    		 		lookupValue : [['2','본사 직영점을 등록'],['3','신규 체인점을 등록'],['4','기존 체인점에 추가']],
    		 		value       : '',
				 	listeners: {
			 			beforeselect: function(self, value, index ) {
			 				if (value.get('code') == '2') {
					 			resource.loadPopup({
					 				select : 'SINGLE',
					 				widget : 'lookup-store-popup',
					 				params : { stor_gb : '1' , stor_sts : '1000', hq_ver : 'N', row_sts : 0 , match_yn : 1  },
					 				result : function(records) {
					 					self.up('form').down('[name=hq_id]' ).setValue(records[0].get('hq_id'  ));
					 					self.up('form').down('[name=stor_grp]' ).setValue(records[0].get('stor_grp'  ));
					 					self.up('form').down('[name=pjt_id]'  ).setValue(records[0].get('pjt_id'   ));
					 					self.up('form').down('[name=pos_ddns]' ).setValue(records[0].get('pos_ddns'  ));
					 					self.up('form').down('[name=web_ddns]' ).setValue(records[0].get('web_ddns'  ));
					 					self.up('form').down('[name=hq_ver]').setValue(records[0].get('hq_ver' ));
					 					self.up('form').down('[name=hq_gb]' ).setValue(records[0].get('hq_gb'  ));

					 					console.debug( records );
					 					/* */
					 					self.setValue(value.get('code'));
					 				}
					 			});
			 				} else
			 				if (value.get('code') == '3') {
					 			resource.loadPopup({
					 				select : 'SINGLE',
					 				widget : 'lookup-bonsa-popup',
					 				params : { hq_sts : ['1000'] , hq_ver : 'N', row_sts : 0 },
					 				result : function(records) {
					 					self.up('form').down('[name=hq_id]' ).setValue(records[0].get('hq_id'  ));
					 					self.up('form').down('[name=pjt_id]'  ).setValue(records[0].get('pjt_id'   ));
					 					self.up('form').down('[name=pos_ddns]' ).setValue(records[0].get('pos_ddns'  ));
					 					self.up('form').down('[name=web_ddns]' ).setValue(records[0].get('web_ddns'  ));
					 					self.up('form').down('[name=hq_ver]').setValue(records[0].get('hq_ver' ));
					 					self.up('form').down('[name=hq_gb]' ).setValue(records[0].get('hq_gb'  ));
					 					/* */
					 					self.setValue(value.get('code'));
					 					console.debug( records );
					 				}
					 			});
			 				} else
			 				if (value.get('code') == '4') {
						 			resource.loadPopup({
						 				select : 'SINGLE',
						 				widget : 'lookup-store-popup',
						 				params : { stor_gb : '3' , stor_sts : '1000' , hq_ver : 'N' , row_sts : 0 , match_yn : 1 },
						 				result : function(records) {

						 					self.up('form').down('[name=hq_id]' ).setValue(records[0].get('hq_id'  ));
						 					self.up('form').down('[name=stor_grp]' ).setValue(records[0].get('stor_grp'  ));
						 					self.up('form').down('[name=pjt_id]'  ).setValue(records[0].get('pjt_id'   ));
						 					self.up('form').down('[name=pos_ddns]' ).setValue(records[0].get('pos_ddns'  ));
						 					self.up('form').down('[name=web_ddns]' ).setValue(records[0].get('web_ddns'  ));
						 					self.up('form').down('[name=hq_ver]').setValue(records[0].get('hq_ver' ));
						 					self.up('form').down('[name=hq_gb]' ).setValue(records[0].get('hq_gb'  ));
						 					/* */
						 					self.setValue(value.get('code'));
						 				}
						 			});
				 			}
			 				return false;
				 		}
				 	}
    		 	},{
    		 		xtype : 'label'     , text : '2.청약 코드 4자리를 입력 하여 주시기 바랍니다.' , margin : '5 0 3 0'
    		 	},{
    		 		xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
    		 		items : [
    		 		 	{
    	    		 		xtype     : 'textfield' ,
    	    		 		name      : 'stor_cd' ,
    	    		 		width     : 135,
    	    		 		maxLength : 4
    		 		 	},{
    		 		 		//fieldLabel : '본사코드',
    		 		 		name      : 'hq_id'  ,
    		 		 		xtype     : 'textfield',
    		 		 		width     : 110 ,
    		 		 		margin	  : '0 0 0 5',
    		 		 		readOnly  : true ,
    		 		 		fieldCls  : 'readonlyfield'
    		 		 	},{
    		 		 		name      : 'stor_grp'  ,
    		 		 		xtype     : 'textfield',
    		 		 		width     : 110 ,
    		 		 		margin	  : '0 0 0 5',
    		 		 		readOnly  : true ,
    		 		 		fieldCls  : 'readonlyfield'
    		 		 	}
    		 		]
    		 	},{
    		 		xtype : 'label'     , text : '3.관리 채널 입력하여 주시기 바랍니다.' , margin : '5 0 3 0'
    		 	},{
    		 		xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
    		 		items : [
    		 		 	{
    		 		 		xtype      : 'popupfield',
    						editable	: true,
    						enableKeyEvents : true,
    		 		 		name       : 'mngt_chnl_nm',
    		 		 		pair       : 'agent_id',
    		 		 		width     : 135,
    		 		 		clearable  : false,
    		 		 		//fieldLabel : '관리채널',
    		 		 		popup: {
    		 		 			select : 'SINGLE',
    		 		 			widget : 'lookup-agent-popup',
    		 		 			params : { row_sts : 0 },
    		 		 			result :  function(records, nameField, pairField ){
    		 		 				var me = this,
	 		 							ct = nameField.up('editor')
	 		 						;
    		 		 				nameField.setValue(records[0].get('mngt_chnl_nm'));
    		 		 				pairField.setValue(records[0].get('agent_id'));
    		 		 				ct.down('[name=distr_nm]').setValue(records[0].get('distr_nm'));
			 		 				ct.down('[name=chnl_id]').setValue(records[0].get('chnl_id'));
    		 		 				ct.down('[name=phone_nm]').setValue(records[0].get('phone_nm'));
			 		 				ct.down('[name=call_cntr_id]').setValue(records[0].get('call_cntr_id'));
    		 		 			}
    		 		 		}
    		 		 	},{
    		 		 		xtype      : 'textfield', name: 'agent_id', hidden:true
    		 		 	},{
    		 		 		name      : 'distr_nm'  ,
    		 		 		xtype     : 'textfield',
    		 		 		width     : 225 ,
    		 		 		margin	  : '0 0 0 5',
    		 		 		readOnly  : true ,
    		 		 		fieldCls  : 'readonlyfield'
    		 		 	},{
       		 		 		xtype      : 'textfield', name: 'chnl_id', hidden:true
    		 		 	}
    		 		]
    		 	},{
    		 		xtype : 'label'     , text : '4.콜센터를 입력 하여 주시기 바랍니다.' , margin : '5 0 3 0'
	 		 	},{
	 		 		xtype      : 'popupfield',
					editable	: true,
					enableKeyEvents : true,
	 		 		name       : 'phone_nm',
	 		 		pair       : 'call_cntr_id',
	 		 		width     : 135,
	 		 		clearable  : false,
	 		 		popup: {
	 		 			select : 'SINGLE',
	 		 			widget : 'lookup-phone-popup',
	 		 			params : { row_sts : 0 },
	 		 			result :  function(records, nameField, pairField ){
	 		 				var me = this,
		 							ct = nameField.up('form')
		 						;
	 		 				nameField.setValue(records[0].get('phone_nm'));
	 		 				pairField.setValue(records[0].get('call_cntr_id'));
	 		 			}
	 		 		}
	 		 	},{
	 		 		xtype      : 'textfield', name: 'call_cntr_id', hidden:true
    		 	},{
    		 		xtype : 'label'     , text : '5.매출고객을 입력 하여 주시기 바랍니다.' , margin : '5 0 3 0'
	 		 	},{
	 		 		xtype      : 'popupfield',
					editable	: true,
					enableKeyEvents : true,
	 		 		name       : 'chrg_nm',
	 		 		pair       : 'chrg_id',
	 		 		width     : 135,
	 		 		clearable  : false,
	 		 		popup: {
	 		 			select : 'SINGLE',
	 		 			widget : 'lookup-charge-popup',
	 		 			params : { row_sts : 0 },
	 		 			result :  function(records, nameField, pairField ){
	 		 				var me = this,
		 							ct = nameField.up('form')
		 						;
	 		 				nameField.setValue(records[0].get('chrg_nm'));
	 		 				pairField.setValue(records[0].get('chrg_id'));
	 		 			}
	 		 		}
	 		 	},{
	 		 		xtype     : 'textfield' , name : 'chrg_id' , hidden:true
    		 	},{ xtype     : 'textfield' , name : 'pjt_id'   , hidden : true
    			},{	xtype     : 'textfield' , name : 'pos_ddns'  , hidden : true
    			},{	xtype     : 'textfield' , name : 'web_ddns'  , hidden : true
    			},{	xtype     : 'textfield' , name : 'hq_ver' , hidden : true
    			},{	xtype     : 'textfield' , name : 'hq_gb'  , hidden : true
    			}
    		]
    	};
    	return editor;
    },

    /**
     * 확인 버튼 이벤트
     */
     finishAction: function(){
    	var me     = this,
    		record   = me.down('form').getValues(),
    		stor_gb  = Ext.String.trim(record.stor_gb),
    		hq_id    = Ext.String.trim(record.hq_id),
    		stor_grp = Ext.String.trim(record.stor_grp),
    		stor_cd  = Ext.String.trim(record.stor_cd)
    	;
     	console.debug(record);

    	if (stor_gb.length != 1) {
        	resource.showError( '청약 유형을 선택하여 주시기 바랍니다.' );
        	return ;
    	} else {
    		record.stor_gb = (stor_gb == '4') ? '3' : stor_gb ;
    	}

    	if (hq_id.length != 10) {
        	resource.showError( '본사 코드가 올바르지 않습니다.' );
        	return ;
        };

      	if (stor_cd.length != 4) {
        	resource.showError( '청약 코드가 올바르지 않습니다.' );
        	return ;
        };

        if ((stor_gb =='3' || stor_gb =='4') && (parseInt(stor_cd) < 2000 || parseInt(stor_cd) > 9999 ) ) {
        	resource.showError( '체인점 코드는 2000 ~ 9999번 대역만 설정 가능 합니다.' );
        	return ;
        }

//        if (Ext.isEmpty(record.chnl_id.trim()) || record.chnl_id == '000-000-000' ) {
//        	Ext.Msg.error( '영업 채널을 선택 하여 주시기 바랍니다.');
//        	return ;
//        }
//        if (Ext.isEmpty(record.agent_id.trim()) || record.agent_id == '000-000-000' ) {
//        	Ext.Msg.error( '관리 채널을 선택 하여 주시기 바랍니다.');
//        	return ;
//        }
//        if (Ext.isEmpty(record.call_cntr_id.trim())  ) {  //|| record.call_cntr_id == '000-000-000'
//        	Ext.Msg.error( '콜센터를 선택 하여 주시기 바랍니다.');
//        	return ;
//        }

        record.hq_id = hq_id;
        record.stor_grp =(stor_grp.length != 14) ? hq_id + stor_cd : stor_grp ;
        record.stor_id = hq_id + stor_cd ;
        me.setResponse(record);
     },
 	/*
 	 * 엑셀붙여넣기
 	 */
 	uploadAction : function() {
 		var me = this
 		;
 		console.debug('uploadAction');
 		resource.loadPopup({
 			select : 'SINGLE',
 			widget : 'module-storeinfo-upload',
 			result : function(records) { /* 엑셀팝업 리턴값 */
 			}
 		});
 	}
});
