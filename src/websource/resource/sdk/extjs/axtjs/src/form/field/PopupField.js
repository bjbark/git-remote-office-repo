/**
 * 팝업 오픈 field
 *
 *
 *
 *
 * ## 사용 방법
 *   {
 *  	fieldLabel: '담당SLC',
 * 	    name: 'searchrespNm',   // 테스트 필드
 * 	    pair: 'searchrespNmId', // 현재 필드와 쌍을 이루는 항목, 팝업에서
 *	    xtype: 'popupfield',
 *	    popup: {
 *				select : SINGLE' or 'MULTI'  // SINGLE 한개만 선택, MULTI: 여러개 선택
 *				widget : 'dept-popup',       // 팝업창 ID
 *				params : {deptid : 'xxxxx' } // 팝업창에 부가적으로 파라메터를 넘겨주어야 할경우
 *			},
 *      // 팝업창이 뜨고 데이터를 선택한 경우
 *	    onSelected: function(nameField, pairField, records  ){
 *			nameField.setValue(records[0].get('dept_nm'));
 *          pairField.setValue(records[0].get('dept_id'));
 *	    },
 *      // 데이터박스에서 클리어 버튼이 눌려진경우
 *	    onClearClick: function(nameField, pairField ){
 *			console.debug( 'onClearClick' , [ nameField, pairField ] );
 *		}
 *  },{
 *	    name: 'searchrespNmId', hidden:true
 *	}
 *
 *
 *
 *
 *
 *
 */
Ext.define('Axt.form.field.PopupField', { extend: 'Ext.form.field.Trigger',

    alias: 'widget.popupfield',

    requires: [ 'Axt.form.field.plugin.ClearButton' ],

    triggerCls: Ext.baseCSSPrefix + 'form-search-trigger',

    editable: false,

    finded : true,

    initComponent: function() {
        var me = this;
        if (me.clearable){
        	me.plugins = ['clearbutton'];
        }
        me.callParent(arguments);
    },
    /**
     * popupId 또는 open()을 이용해 팝업창을 나타낸다.
     */
    onTriggerClick: function() {
    	if (this.popup && Ext.isFunction(this.popup.create)) {
    		this.popup.create.call(this, this );
    	}
    	 var params = {},
    		widget = this.popup.widget
    	;
    	if(this.finded){
    		this.popup.params.find = this.getValue();
    	}
    	if (Ext.isEmpty(widget)){ return; }
		if (Ext.getCmp(widget)) { return; }

		params.onSelected = this.onSelected || {};
		params.popup = this.popup || {} ;
		params.owner = this;
		Ext.widget(widget, params);

    },
	/**
	 * 해당 팝업 선택시 이벤트. 각 field에서 override
	 */
    onSelected: Ext.emptyFn,
    /**
     * textfield onclick event
     *
     * event 중복 방지를 위해 {@link ClearButton#handleMouseClickOnClearButton} 실행시
     * clearButtonClicked: true로 설정
     */
    listeners: {
    	keydown:function(self,e){
    		var me = this;
    		if (e.keyCode == e.ENTER && me.editable){
    			me.onTriggerClick();  /* 팝업창을 호출 */
    		}
    	},
	    render: function(p) {
			p.getEl().on('click', function(e){
				if (!this.disabled || !this.readOnly) {
					if (e.clearButtonClicked) {
						delete e.clearButtonClicked;
					}
				}
			}, this);
		}
	}

});
