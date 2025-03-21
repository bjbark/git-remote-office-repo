Ext.define('Axt.form.field.LookupField', { extend:'Ext.form.field.ComboBox',

	alias: 'widget.lookupfield',

	displayField : 'name',
	valueField : 'code',
	dataField : 'data' ,

	lookupValue : undefined,

	/**
	 * 기본 선택 index
	 */
	selectedIndex : undefined,
	autoSelection : false,

    /**
     * component 초기화
     */
	initComponent: function() {
    	var me = this;

    	// lookupvalue 값 셋팅
    	if(!me.store) {
        	me.setLookupValue(me.lookupValue);
    	}
    	me.callParent();

    	if (me.autoSelection) {
    		if (Ext.isArray(me.lookupValue)) {
    			me.setValue(me.lookupValue[0][0]);
    		}
    	} else {
        	// selectedIndex설정 되어있을경우 선택
        	me.setSelectedIndex(me.selectedIndex);
    	}
    },


    /**
     * lookupvalue set
     *
     * @param {Array} lookupValue
     * [
	 *     [Const.PaperType.A4_NORMAL, '일반 순면지 A4 (일반)'],
	 *     [Const.PaperType.A5_DOUBLE, '일반 양식지 A5*2'],
	 *     [Const.PaperType.A5_DOUBLE_ADDR, '일반 양식지 A5*2 (주소포함)']
     * ]
     */
    setLookupValue : function (lookupValue) {
    	var me = this;
    	me.lookupValue = lookupValue;
    	if ( ! Ext.isEmpty(lookupValue) && Ext.isArray(lookupValue)) {
			for(var i=0; i<lookupValue.length; i++) {
				if(lookupValue[i][1] === '') { // lookupValue의 displayValue(key) 부분이 공백일경우 특수문자 공백으로 바꿔서 넣어준다.
					lookupValue[i][1] = '　'; // <-- 빈공백이 아니고 ㄱ + 한자키의 특수문자이다.
				}
			}
			var store = new Ext.data.ArrayStore({
				 fields :[me.valueField, me.displayField, me.dataField ],
				 data   : lookupValue
			});
			me.bindStore(store);
		} else {
		}
    },

    /**
     * 선택된 index에 해당하는 combobox의 값을 선택
     */
    setSelectedIndex : function(selectedIndex) {
    	var me = this;
    	var lookupValue = me.lookupValue;
		if (selectedIndex > -1 && Ext.isArray(lookupValue)) {
			for(var i=0; i<lookupValue.length; i++ ) {
			    if(i === selectedIndex) {
			    	me.setValue(lookupValue[i][0]);
			    	break;
			    }
			}
		}
    }

});



//console.debug( 'gggg' );
//me.displayField = 'col1';
//me.valueField = 'value';
//me.store = new Ext.data.SimpleStore({
//    fields: ['value','col1','col2'],
//    data: [['val1','Collumn 1','Collumn 2'],['hworld','Hello','world']]
//});
//	me.mode = 'local',
//    me.valueField = 'value',
//    me.triggerAction = 'all',
//    //me.name = 'type',
//    //me.editable = false,
//    //me.tpl = '<div class="x-combo-list-item"><div class="col1">{col1}</div><div class="col2">{col2}</div></div>'
//    me.tpl = '<div class="x-combo-list-item"><div style="position: absolute;left: 0;">{col1}</div><div style="position: relative;left: 150;">{col2}</div></div>'
////me.store = new Ext.data.Store( me.lookupValue );
//}
//http://www.sencha.com/learn/combobox-faq#linked_comboBoxes