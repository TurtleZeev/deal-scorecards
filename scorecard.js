const { useState } = React;

const CategoryIcon = ({ category }) => {
  // Simplified icon representation using text for now
  return <span className="font-bold">📊</span>;
};

function ScoreCard() {
  const [expandedCategory, setExpandedCategory] = useState(null);
  
  const scores = {
    'Core Categories': {
      'Financial Fundamentals': {
        score: 18,
        total: 20,
        details: {
          'Growth trajectory': 5,
          'Margin profile': 4,
          'Unit economics': 5,
          'Cash flow dynamics': 4
        }
      },
      'Market Opportunity': {
        score: 19,
        total: 20,
        details: {
          'Market size': 5,
          'Growth rate': 5,
          'Competitive positioning': 5,
          'Regulatory tailwinds': 4
        }
      },
      'Team & Execution': {
        score: 17,
        total: 20,
        details: {
          'Management experience': 4,
          'Track record': 3,
          'Operational capabilities': 5,
          'Strategic relationships': 5
        }
      }
    },
    'Risk Categories': {
      'Financial Risk': {
        score: 14,
        total: 15,
        details: {
          'Credit risk': 5,
          'Working capital risk': 4,
          'Growth funding risk': 5
        }
      },
      'Market Risk': {
        score: 14,
        total: 15,
        details: {
          'Competition risk': 5,
          'Regulatory risk': 4,
          'Market adoption risk': 5
        }
      },
      'Operational Risk': {
        score: 8,
        total: 10,
        details: {
          'Execution risk': 4,
          'Technology risk': 4
        }
      }
    }
  };

  const totalScore = Object.values(scores).reduce((acc, group) => 
    acc + Object.values(group).reduce((sum, category) => sum + category.score, 0), 0
  );

  const totalPossible = Object.values(scores).reduce((acc, group) => 
    acc + Object.values(group).reduce((sum, category) => sum + category.total, 0), 0
  );

  const getScoreColor = (score, total) => {
    const percentage = (score / total) * 100;
    return percentage >= 85 ? 'bg-green-500' : 
           percentage >= 70 ? 'bg-yellow-500' : 
           'bg-red-500';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Turtle Hill Capital - Deal Score™</h1>
        <div className="text-5xl font-bold text-blue-600">
          {totalScore}/{totalPossible}
        </div>
        <div className="mt-2 text-gray-600">Overall Rating: Strong Proceed</div>
      </div>

      {Object.entries(scores).map(([groupName, categories]) => (
        <div key={groupName} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{groupName}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(categories).map(([category, { score, total, details }]) => (
              <div 
                key={category}
                className={`p-4 rounded-lg border transition-all cursor-pointer hover:shadow-md
                  ${expandedCategory === category ? 'col-span-full bg-blue-50' : 'bg-white'}`}
                onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <CategoryIcon category={category} />
                    <h3 className="font-medium">{category}</h3>
                  </div>
                  <div className="text-lg font-bold">{score}/{total}</div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className={`${getScoreColor(score, total)} h-2 rounded-full transition-all`}
                    style={{ width: `${(score/total) * 100}%` }}
                  />
                </div>

                {expandedCategory === category && (
                  <div className="mt-4 space-y-2">
                    {Object.entries(details).map(([metric, value]) => (
                      <div key={metric} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">{metric}</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full mx-0.5 ${
                                i < value ? 'bg-blue-500' : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

ReactDOM.render(
  <ScoreCard />,
  document.getElementById('root')
);
