/**
 */
Ext.define('lookup.upload.ItemUpload', {  extend: 'Axt.popup.Upload',
    alias: 'widget.lookup-item-upload',

    title: '아이템 이미지 업로드',

    closable: true,
    autoShow: true,
    width: 380,
    height: 250,
    layout: {
        type: 'border'
    },

    /**
     * 허용되는 확장자
     */
    allowExtension : [], // 빈 배열은 무제한

    /**
     * 서버전송한 URL
     */
   // url : '',

    /**
     * 서버에 전송중일때 뜨는 progressbar의 메시지
     */
    waitMsg : Const.INSERT.mask,

    /**
     * fieldField의 config
     */
    fileFieldConfig: {},

    /**
     * upload 전송 버튼 config
     */
    uploadBtnConfig : {},

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
            xtype      : 'form-panel',
            region     : 'center',
            border     :  false,
            dockedItems:
            [
                {
                    xtype : 'toolbar',
                    dock  : 'bottom',
                    items :
                    [
                        '->' ,
                        {xtype: 'button' , text : '업로드' , iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
                        {xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close , cls: 'button-style'}
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

        if(Ext.isEmpty(me.popup.apiurl.master)) {
            Ext.Msg.alert('', 'url이 설정되지 않았습니다.');
            return;
        }
        var form =
        {
            xtype :'form-panel' ,
            region:'center',
            layout : 'border',
            border : false,
            layout : { type: 'vbox', align: 'stretch'} ,
            items :
            [
                {
                    xtype   : 'form-panel',
                    name    : 'uploadForm',
                    region  : 'center',
                    standardSubmit: false,
                    border :  false,
                    url     : me.popup.apiurl.master,
                    timeout : 120000,
                    method  : 'POST',
                    layout : { type: 'vbox', align: 'stretch' } ,
                    padding : 10 ,
                    renderTo: Ext.getBody(),
                    items:
                    [
                        {
                            xtype  : 'label',
                            text   : '업로드할 파일을 선택 하여 주시기 바랍니다.' ,
                            margin : '0 0 5 0'
                        },
                        {
                            xtype       : 'filefield',
                            name        : 'files',
                            fieldLabel  : '상품이미지1',
                            msgTarget   : 'side',
                            allowBlank  : true,
                            anchor      : '100%',
                            width       : 350,
                            buttonText  : '선택',
                            regex       : new RegExp('.+(' + me.allowExtension.join('|\.') + ')$', 'i') // 확장자 제한 정규식
                        },
                        {
                            xtype       : 'filefield',
                            name        : 'files',
                            fieldLabel  : '상품이미지2',
                            msgTarget   : 'side',
                            allowBlank  : true,
                            anchor      : '100%',
                            width       : 350,
                            style       : 'margin-top:10px;',
                            buttonText  : '선택',
                            extension   : ['jpg', 'png', 'gif'],
                            regex       : new RegExp('.+(' + me.allowExtension.join('|\.') + ')$', 'i') // 확장자 제한 정규식
                        },
                        {
                            xtype       : 'filefield',
                            name        : 'files',
                            fieldLabel  : '상품이미지3',
                            msgTarget   : 'side',
                            allowBlank  : true,
                            anchor      : '100%',
                            width       : 350,
                            style       : 'margin-top:10px;',
                            buttonText  : '선택',
                            extension   : ['jpg', 'png', 'gif'],
                            regex       : new RegExp('.+(' + me.allowExtension.join('|\.') + ')$', 'i') // 확장자 제한 정규식
                        },
                        {
                            xtype       : 'filefield',
                            name        : 'files',
                            fieldLabel  : '상품이미지4',
                            msgTarget   : 'side',
                            allowBlank  : true,
                            anchor      : '100%',
                            width       : 350,
                            style       : 'margin-top:10px;',
                            buttonText  : '선택',
                            extension   : ['jpg', 'png', 'gif'],
                            regex       : new RegExp('.+(' + me.allowExtension.join('|\.') + ')$', 'i') // 확장자 제한 정규식
                        },

                        {xtype:'hiddenfield', name:'param', value:'' },
                        {xtype:'hiddenfield', name:'token', value:_global.token_id }
                    ]
                }
            ]
        };
        return form;
    },

    /**
     * @private
     * 이미지 업로드 팝업에서 확인버튼 (서버에 이미지 전송)
     */
    finishAction : function (button) {
        var me = this;
        var param = {};
        param.stor_grp  = _global.stor_grp;
        param.stor_id = _global.stor_id;

        //개발자정의 파라미터 삽입
        Ext.merge(param, me.params);

        // submit할 form가져오기
        var uploadForm = me.down('[name=uploadForm]');
        if(!uploadForm.isValid()) {
            Ext.Msg.alert(Const.NOTICE, '<span style="color:black">Upload</span>할 파일형식을 확인해 주십시오.<br/><span style="color:blue">['+ me.allowExtension.join(', ') +']</span>만 업로드 가능합니다.');
            return;
        }

        // 파라미터 삽입
        uploadForm.getForm().setValues({
            param : JSON.stringify(param)
        });

        // submit
        uploadForm.getForm().submit({
            waitMsg:me.waitMsg, // progressbar 띄우기
            success:function(form, action){
                Ext.Msg.alert( '', '업로드 성공 했습니다.' );
                me.close();
            },
            failure: function(form, action) {
                Ext.Msg.alert( '', '업로드 실패 했습니다.' );
                me.close();
            }
        });
    }

});
