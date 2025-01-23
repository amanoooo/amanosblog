---
title: unity对话框打印机特效
date: 2025-01-23 08:34:40
tags:
    - unity
---


## 分享一下我的对话框打印机特效

### 上下文

uGUI 已经变成弃用了，我使用的最近 unity 6 的 UI Document。

小镇Town 场景有一个 TownUI 的 UIDocument, TownUI里面有一个类似 Prefab 的Dialog 的UIDocuement， Dialog 里面是一个VisualElement 作为背景， 里面是ScrollView， 然后里面是Label， 你会看到我的代码里也是这么查询的。

TownHandler 变成static 是方便在变得场景中随时调用

showStr 变成public 是为了支持可以在 inspector 那边随时更改


### 实现

```csharp
using UnityEngine;
using UnityEngine.UIElements;
using System.Collections;

public class TownHandler : MonoBehaviour
{

    public static TownHandler instance { get; private set; }



    public float displayTime = 4.0f;
    private VisualElement m_NonPlayerDialogue;
    private float m_TimerDisplay;

    public string showStr;    //需要打出来的字
    private Label label;    //打字展示的文本
    private ScrollView scrollView;




    // Awake is called when the script instance is being loaded (in this situation, when the game scene loads)
    private void Awake()
    {
        instance = this;
    }


    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {

        UIDocument uiDocument = GetComponent<UIDocument>();
        //m_Healthbar = uiDocument.rootVisualElement.Q<VisualElement>("HealthBar");
        //SetHealthValue(1.0f);


        m_NonPlayerDialogue = uiDocument.rootVisualElement.Q<VisualElement>("Dialog");
        m_NonPlayerDialogue.style.display = DisplayStyle.None;
        m_TimerDisplay = -1.0f;


        scrollView = m_NonPlayerDialogue.Q<ScrollView>(); 
        label = scrollView.Q<Label>(); // 使用 Label 的名称

        Debug.LogWarning("label is " + label);
    }

    // Update is called once per frame
    void Update()
    {
        //if (m_TimerDisplay > 0)
        //{
        //    m_TimerDisplay -= Time.deltaTime;
        //    if (m_TimerDisplay < 0)
        //    {
        //        m_NonPlayerDialogue.style.display = DisplayStyle.None;
        //    }


        //}
    }

    public void DisplayDialogue()
    {
        Debug.Log("DisplayDialogue");
        m_NonPlayerDialogue.style.display = DisplayStyle.Flex;
        m_TimerDisplay = displayTime;

        StartCoroutine(PrintWord());

    }

    IEnumerator PrintWord()
    {

        foreach (char letter in showStr)
        {
            label.text += letter; // 添加一个字符
            yield return new WaitForSeconds(0.1f); // 模拟打印速度，调整时间来控制速度


            scrollView.scrollOffset = new Vector2(0, label.resolvedStyle.height);  // 设置滚动位置到最底部
        }



    }

}

```
