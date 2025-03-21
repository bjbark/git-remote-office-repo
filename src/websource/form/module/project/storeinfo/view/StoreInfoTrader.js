Ext.define('module.project.storeinfo.view.StoreInfoTrader', { extend: 'Axt.popup.Search',

    id    : 'module-control-storeinfo-trader',
    alias : 'widget.module-storeinfo-trader' ,
    store : 'module.project.storeinfo.store.StoreInfoTrader' ,

    addon : undefined ,

    //title: '제휴 서비스 정보' ,
    closable: true,
    autoShow: true,
    width: 900,
    height: 500,
    layout: {
        type: 'border'
    },
	defaultFocus : 'initfocused',
    initComponent: function(config){
        var me = this;
        me.items = [ me.createTabs() ]; //  , ,  me.createGrid(),  me.createForm()
        me.callParent(arguments);
        me.selectAction();
    },

	/**
	 *
	 */
	createTabs : function () {
		var me = this, item =
		{
			xtype	: 'tabpanel',
			itemId	: 'mainpanel',
			region	: 'center',
			plain	: true,
//			margin : 0 ,
			items	:  [
			 	{
			 		title	: '제휴 서비스 정보' ,
			 		layout	: {
			 		type	: 'border'
			 		},
			 		items	: [ me.createGrid() ]
			 	}, {
			 		title	: '연동 서비스 정보',
			 		layout	: {
			 			type: 'border'
			 		},
			 		items	: [ me.createForm() ]
			 	}

			]
		};
		return item;
	},



    createGrid: function(){
        var me = this , grid =
        {
        	xtype  : 'grid-panel',
        	//header : false,
        	region : 'center',
        	viewConfig: {
        		loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask })
        	},
        	selModel  : {selType:'cellmodel'},
        	plugins   : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
        	store   : Ext.create( me.store ),
        	paging  :
        	{
        		xtype: 'grid-paging',
        		items:
        		[
        		 	'->' ,
        		 	{xtype: 'button' , text : Const.UPDATE.text, iconCls: Const.UPDATE.icon , scope: me, handler: me.updateAction, cls: 'button_style'},'-',
        		 	{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close , cls: 'button_style'}
        		]
        	},
        	columns: [
        	 	{ text : '제휴사ID'  , dataIndex: 'trade_id'  , width: 80
    	 		},{ text : '제휴사명'  , dataIndex: 'trade_nm'  , width: 150
	 			},{ text		: '제휴코드'  ,
        	 		dataIndex	: 'trade_cd'  ,
        	 		width		: 120,
        	 		tdCls		: 'editingcolumn',
        	 		editor		: {
        	 			xtype        : 'textfield',
        	 			selectOnFocus: true
        	 		}
        	 	},{ text		: '인증암호'  ,
        	 		dataIndex	: 'trade_pwd'  ,
        	 		width		: 120,
        	 		tdCls		: 'editingcolumn',
        	 		editor		: {
        	 			xtype   : 'textfield',
        	 			selectOnFocus: true
        	 		}
        	 	},{	text		: '백터암호'  ,
        	 		dataIndex	: 'trade_cg'  ,
        	 		width		: 120,
        	 		tdCls		: 'editingcolumn',
        	 		editor		: {
        	 			xtype        : 'textfield',
        	 			selectOnFocus: true
        	 		}
        	 	},{	text		: '사업자번호'  ,
        	 		dataIndex	: 'stor_no'  ,
        	 		width		: 120,
        	 		tdCls		: 'editingcolumn',
        	 		editor		: {
        	 			xtype   : 'textfield',
        	 			selectOnFocus: true
        	 		}
        	 	},{	text        : '제휴상태'  ,
        	 		dataIndex   : 'trade_sts'  ,
        	 		xtype       : 'lookupcolumn' ,
        	 		lookupValue : resource.lookup('trade_sts'),
        	 		align       : 'center' ,
        	 		tdCls       : 'editingcolumn',
        	 		width       : 80 ,
        	 		editor      : {
        	 			xtype   : 'lookupfield',
        	 			editable: false,
        	 			lookupValue : resource.lookup('trade_sts' )
        	 		}
        	 	},{	text		: '메모'  ,
        	 		dataIndex	: 'usr_memo'  ,
        	 		flex		: 1,
        	 		tdCls		: 'editingcolumn',
        	 		editor		: {
        	 			xtype   : 'textfield',
        	 			selectOnFocus: true
        	 		}
        	 	}
        	]
        };
        return grid;
    },

    /**
     * 화면폼
     */
    createForm: function(){
    	var me = this, form =
    	{
    		xtype      : 'form-panel',
    		name       : 'createForm',
    		region     : 'center',

    		border     : false,
    		dockedItems: [
    		 	{	xtype : 'toolbar',
    		 		dock  : 'bottom',
    		 		items : [
    		 		 	'->' ,
    		 		 	{xtype: 'button' , text : Const.UPDATE.text, iconCls: Const.UPDATE.icon , scope: me, handler: me.updatetaxAction, cls: 'button_style'},'-',
    		 		 	{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close , cls: 'button_style'}
       		 		]
    		 	}
    	 	],
    	 	items : [ me.createaddon() ]
    	};
    	return form;
    },


    createaddon : function () {
    	var me = this, form =
    	{
    		xtype  : 'form-panel',
    		border :  false,
    		name   : 'addonform',
    		padding : 10 ,
    		layout : { type: 'hbox', align: 'stretch' } ,
    		items  : [
		    	{	xtype        : 'form-panel',
					border       : 0,
					width        : 200,
					fieldDefaults: { width : 200, labelWidth : 70, labelSeparator : '' },
					items : [
			 		 	{ text : '전자 세금계산서 정보' , xtype : 'label' , margin : '0 0 0 25'},
					 	{ name : 'tax_provider' , fieldLabel : 'TAX 업체' ,  xtype : 'lookupfield', editable   : false, lookupValue : resource.lookup('tax_id') , value : '0' , margin : '5 0 5 0'},
			 		 	{ name : 'tax_api_user' , fieldLabel : 'TAX 코드' ,  xtype : 'textfield'  },
			 		 	{ name : 'tax_api_pswd' , fieldLabel : 'TAX P/W' ,  xtype : 'textfield'  },
			 		 	{ name : 'tax_api_http' , fieldLabel : 'TAX API URL' ,  xtype : 'textfield'  },
			 		 	{ name : 'tax_user_memo', fieldLabel : '메모사항'  , xtype : 'textarea', height : 100 },
			 		 	{ name : 'pos_ddns' , xtype : 'textfield' , hidden : true  },
			 		 	{ name : 'pjt_id'  , xtype : 'textfield' , hidden : true },
			 		 	{ name : 'del_yn' , xtype : 'textfield' , hidden : true },
			 		 	{ name : 'hq_id' , xtype : 'textfield' , hidden : true },
			 		 	{ name : 'ctrl_id' , xtype : 'textfield' , hidden : true }
					]
				},{	xtype        : 'form-panel',
					border       : 0,
					width        : 210,
					margin       : '0 0 0 20',
					fieldDefaults: { width : 200, labelWidth : 80, labelSeparator : '' },
					items		: [
			 		 	{ text : 'SMS 정보' , xtype : 'label' , margin : '0 0 0 15'},
					 	{ name : 'sms_provider' , fieldLabel : 'SMS 업체' ,  xtype : 'lookupfield', editable   : false, lookupValue : resource.lookup('sms_id') , value : '0' , margin : '5 0 5 0'},
			 		 	{ name : 'sms_api_user' , fieldLabel : 'SMS 코드' ,  xtype : 'textfield'  },
			 		 	{ name : 'sms_pri'    , fieldLabel : '단문 메세지 단가' ,  xtype : 'numericfield'  },
			 		 	{ name : 'lms_pri'    , fieldLabel : '장문 메세지 단가' ,  xtype : 'numericfield'  },
			 		 	{ name : 'mms_pri'    , fieldLabel : '멀티 메세지 단가' ,  xtype : 'numericfield'  },
			 		 	{ name : 'sms_user_memo', fieldLabel : '메모사항'  , xtype : 'textarea', height : 100 },
					]
				},{	xtype        : 'form-panel',
					border       : 0,
					width        : 200,
					fieldDefaults: { width : 200, labelWidth : 70, labelSeparator : '' },
					items		: [
			 		 	{ text : 'OMP 정보' , xtype : 'label' , margin : '0 0 0 25'},
			 		 	{ name : 'omp_provider' , fieldLabel : 'OPM 업체' ,  xtype : 'lookupfield', editable   : false, lookupValue : resource.lookup('omp_id') , value : '0' , margin : '5 0 5 0'},
			 		 	{ name : 'omp_api_user' , fieldLabel : 'OPM 코드' ,  xtype : 'textfield'  },
			 		 	{ name : 'omp_api_pswd' , fieldLabel : 'OPM P/W' ,  xtype : 'textfield'  },
			 		 	{ name : 'omp_api_http' , fieldLabel : 'OMP API URL' ,  xtype : 'textfield'  },
			 		 	{ name : 'omp_key_code' , fieldLabel : 'OMP API KEY' ,  xtype : 'textfield'  },
			 		 	{ name : 'omp_user_memo', fieldLabel : '메모사항'  , xtype : 'textarea', height : 100 }
					]
				}
    		]
    	};
    	return form;
    },




    /**
     * 조회
     */
    selectAction: function(){
    	var me    = this,
    		store = me.down('grid').getStore(),
    		form  = me.down('form'), //.down('form') ,
    		param = Ext.merge(  {  // me.down('form').getValues(),
    		}, me.popup.params );
    	;
        if (me.popup.apiurl && me.popup.apiurl.search ) {
        	store.getProxy().api.read = me.popup.apiurl.search ;
        }

        store.load({
        	params   : {param:JSON.stringify(param)},
        	scope    : me,
        	callback : function(records, operation, success) {
        		//if (me.popup.values && me.popup.values.barcode) {
        			//delete me.popup.values.barcode ;
        		//}
        	}
        });

//        console.debug('form', form);

        me.addon = Ext.create('module.project.storeinfo.store.StoreInfoAddon');

        var addonform = me.down('[name=addonform]') ;
        /* 전자세금계산서 , SMS , OMP 정보 조회*/
        me.addon.load({
        	params   : {param:JSON.stringify(param)},
        	scope    : me,
        	callback : function(records, operation, success) {

        		addonform.loadRecord(records[0] );


        	}
        });


    },


    updateAction : function() {
    	var me = this,
			lister = me.down('grid'),
		    changs = lister.getStore().getUpdatedRecords().length
		;
    	if (changs>0){
    		var mask = new Ext.LoadMask(me.getEl(), {msg: Const.UPDATE.mask });
    		mask.show();
    		setTimeout(function(){
    			lister.getStore().sync({
    				success : function(operation){  }, // 저장 성공시
    				failure : function(operation){  }, // 저장 실패시 호출
    				callback: function(operation){
    					mask.hide();
    					//me.selectDetail(master, select);
    				}
    			});
    		}, 100);
    	}
    	//console.debug( lister.getStore() );
    },


    /* 전자세금계산서 정보 저장 */
    updatetaxAction : function() {
    	var me = this,
    		form  = me.down('[name=addonform]'),
    	    record = form.getRecord(),
    	    values = form.getValues()
		;
    	record.set(values);
    	if (me.addon.getUpdatedRecords().length > 0) {
    		var mask = new Ext.LoadMask(me.getEl(), {msg: Const.UPDATE.mask });
    		mask.show();
    		setTimeout(function(){
    			me.addon.sync({
    					success : function(operation){  }, // 저장 성공시
    					failure : function(operation){  }, // 저장 실패시 호출
    					callback: function(operation){
    				    	mask.hide();
    					}
    			});
    		}, 100);
    	}


    },

});
