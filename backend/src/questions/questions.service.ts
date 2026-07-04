import { Injectable } from '@nestjs/common';
import { Question, SAMPLE_QUESTIONS } from './data/sample-questions';

@Injectable()
export class QuestionsService {
  /**
   * Get a random set of questions from the offline database based on requested counts.
   * If the pool is smaller than the requested count, it dynamically generates variants.
   */
  getMockQuestions(
    englishCount: number,
    chemistryCount: number,
    physicsCount: number,
    mathCount: number,
    chapter?: string,
  ): Question[] {
    let englishPool = SAMPLE_QUESTIONS.filter(q => q.subject === 'english');
    let chemistryPool = SAMPLE_QUESTIONS.filter(q => q.subject === 'chemistry');
    let physicsPool = SAMPLE_QUESTIONS.filter(q => q.subject === 'physics');
    let mathPool = SAMPLE_QUESTIONS.filter(q => q.subject === 'mathematics');

    if (chapter) {
      const name = chapter.toLowerCase();
      let keywords: string[] = [];

      if (name.includes('calculus') || name.includes('integration')) {
        keywords = ['limit', 'derivative', 'integral', 'area bounded', 'dy/dx', 'dx', '∫', 'lim'];
      } else if (name.includes('algebra') || name.includes('matrices')) {
        keywords = ['matrix', 'determinant', 'geometric', 'root', 'complex', 'log', 'progression'];
      } else if (name.includes('geometry') || name.includes('coordinate')) {
        keywords = ['tangent', 'circle', 'coordinate', 'line'];
      } else if (name.includes('mechanics') || name.includes('fluids')) {
        keywords = ['viscosity', 'cylinder', 'velocity', 'stokes', 'fluid', 'force', 'gyration'];
      } else if (name.includes('electricity') || name.includes('magnetism') || name.includes('capacitance')) {
        keywords = ['capacitance', 'plate', 'dielectric', 'charge', 'electric', 'capacitor'];
      } else if (name.includes('thermodynamics') || name.includes('wave') || name.includes('optics')) {
        keywords = ['doppler', 'frequency', 'wave', 'interference', 'slit', 'fringe', 'temperature', 'heat', 'thermal'];
      } else if (name.includes('physical')) {
        keywords = ['concentration', 'molarity', 'solution', 'physical', 'rate', 'chemical'];
      } else if (name.includes('organic')) {
        keywords = ['dehydration', 'ethene', 'grignard', 'alcohol', 'rosenmund', 'reduction', 'ether', 'decarboxylation', 'reagent'];
      } else if (name.includes('concord') || name.includes('grammar') || name.includes('agreement')) {
        keywords = ['concord', 'agreement', 'subject-verb', 'grammar', 'sentence', 'verb'];
      } else if (name.includes('vocabulary') || name.includes('idioms')) {
        keywords = ['vocabulary', 'antonym', 'synonym', 'idiom', 'meaning'];
      }

      if (keywords.length > 0) {
        const filterFn = (q: any) => {
          const qText = (
            (q.questionData.question_plain_title || '') + ' ' + 
            (q.questionData.explanation || '')
          ).toLowerCase();
          return keywords.some(kw => qText.includes(kw));
        };

        const filteredEnglish = englishPool.filter(filterFn);
        if (filteredEnglish.length > 0) englishPool = filteredEnglish;

        const filteredChemistry = chemistryPool.filter(filterFn);
        if (filteredChemistry.length > 0) chemistryPool = filteredChemistry;

        const filteredPhysics = physicsPool.filter(filterFn);
        if (filteredPhysics.length > 0) physicsPool = filteredPhysics;

        const filteredMath = mathPool.filter(filterFn);
        if (filteredMath.length > 0) mathPool = filteredMath;
      }
    }

    const selected: Question[] = [];

    selected.push(...this.getRandomSubset(englishPool, englishCount));
    selected.push(...this.getRandomSubset(chemistryPool, chemistryCount));
    selected.push(...this.getRandomSubset(physicsPool, physicsCount));
    selected.push(...this.getRandomSubset(mathPool, mathCount));

    return selected;
  }

  /**
   * Helper to pick N random items from a list, scaling up with variants if count > pool.length.
   */
  private getRandomSubset(pool: Question[], count: number): Question[] {
    if (pool.length === 0) return [];
    
    const selected: Question[] = [];
    let attempts = 0;
    
    while (selected.length < count) {
      const idx = attempts % pool.length;
      const original = pool[idx];
      
      const cloned = JSON.parse(JSON.stringify(original)) as Question;
      
      cloned.id = original.id * 100 + selected.length;
      
      if (cloned.isParametric) {
        this.resolveParametricQuestion(cloned);
      } else if (selected.length >= pool.length) {
        const variantIndex = Math.floor(selected.length / pool.length) + 1;
        cloned.questionData.question_plain_title = `[Set B Var ${variantIndex}] ${cloned.questionData.question_plain_title}`;
        
        if (!isNaN(Number(cloned.questionData.ans1_plain_text))) {
          cloned.questionData.ans1_plain_text = String(Number(cloned.questionData.ans1_plain_text) * (variantIndex + 1));
          cloned.questionData.ans2_plain_text = String(Number(cloned.questionData.ans2_plain_text) * (variantIndex + 1));
          cloned.questionData.ans3_plain_text = String(Number(cloned.questionData.ans3_plain_text) * (variantIndex + 1));
          cloned.questionData.ans4_plain_text = String(Number(cloned.questionData.ans4_plain_text) * (variantIndex + 1));
        }
      }
      
      selected.push(cloned);
      attempts++;
    }
    
    return selected.sort(() => 0.5 - Math.random());
  }

  /**
   * Resolves a parametric question template into a real, randomly-generated question set.
   */
  private resolveParametricQuestion(q: Question): void {
    const type = q.parametricType;
    const qData = q.questionData;

    if (type === 'determinant') {
      const a = Math.floor(Math.random() * 8) + 2; // 2 to 9
      const b = Math.floor(Math.random() * 8) + 1; // 1 to 8
      const c = Math.floor(Math.random() * 5) + 1; // 1 to 5
      const d = Math.floor(Math.random() * 8) + 2; // 2 to 9
      const det = (a * d) - (b * c);

      const ans1 = String(det);
      const ans2 = String(det + 2);
      const ans3 = String(det - 5);
      const ans4 = String(a * d + b * c);

      qData.question_plain_title = qData.question_plain_title
        .replace('{a}', String(a)).replace('{b}', String(b))
        .replace('{c}', String(c)).replace('{d}', String(d));

      qData.ans1_plain_text = ans1;
      qData.ans2_plain_text = ans2;
      qData.ans3_plain_text = ans3;
      qData.ans4_plain_text = ans4;

      if (qData.explanation) {
        qData.explanation = qData.explanation
          .replace('{a}', String(a)).replace('{b}', String(b))
          .replace('{c}', String(c)).replace('{d}', String(d))
          .replace('{det}', String(det));
      }
    } 
    else if (type === 'limit_sin') {
      const a = Math.floor(Math.random() * 7) + 2; // 2 to 8
      const ans1 = String(a);
      const ans2 = '1';
      const ans3 = '0';
      const ans4 = String(a * 2);

      qData.question_plain_title = qData.question_plain_title.replace('{a}', String(a));
      qData.ans1_plain_text = ans1;
      qData.ans2_plain_text = ans2;
      qData.ans3_plain_text = ans3;
      qData.ans4_plain_text = ans4;

      if (qData.explanation) {
        qData.explanation = qData.explanation.replace('{a}', String(a));
      }
    }
    else if (type === 'integration_by_parts') {
      const a = Math.floor(Math.random() * 5) + 2; // 2 to 6
      const a_sq = a * a;
      
      const ans1 = `(x/${a}) * e^(${a}x) - (1/${a_sq}) * e^(${a}x) + C`;
      const ans2 = `x * e^(${a}x) - e^(${a}x) + C`;
      const ans3 = `${a}x * e^(${a}x) + C`;
      const ans4 = `(1/${a}) * e^(${a}x) + C`;

      qData.question_plain_title = qData.question_plain_title.replace('{a}', String(a));
      qData.ans1_plain_text = ans1;
      qData.ans2_plain_text = ans2;
      qData.ans3_plain_text = ans3;
      qData.ans4_plain_text = ans4;

      if (qData.explanation) {
        qData.explanation = qData.explanation
          .replace(/{a}/g, String(a))
          .replace(/{a_sq}/g, String(a_sq));
      }
    }
    else if (type === 'vector_cross_product') {
      const a = (Math.floor(Math.random() * 5) + 2) * 2; // 4, 6, 8, 10, 12
      const b = Math.floor(Math.random() * 7) + 2; // 2 to 8
      const magnitude = a * b * 0.5; // sin(30) = 0.5

      const ans1 = `${magnitude} units`;
      const ans2 = `${a * b} units`;
      const ans3 = `${magnitude * 1.5} units`;
      const ans4 = `${(a * b * 0.866).toFixed(1)} units`;

      qData.question_plain_title = qData.question_plain_title
        .replace('{a}', String(a))
        .replace('{b}', String(b));

      qData.ans1_plain_text = ans1;
      qData.ans2_plain_text = ans2;
      qData.ans3_plain_text = ans3;
      qData.ans4_plain_text = ans4;

      if (qData.explanation) {
        qData.explanation = qData.explanation
          .replace('{a}', String(a))
          .replace('{b}', String(b))
          .replace('{magnitude}', String(magnitude));
      }
    }
    else if (type === 'projectile_height') {
      const velocities = [10, 20, 30, 40, 50, 60];
      const u = velocities[Math.floor(Math.random() * velocities.length)];
      const height = (u * u) / 20; // H = u^2 / 2g

      const ans1 = `${height} meters`;
      const ans2 = `${height * 2} meters`;
      const ans3 = `${u / 2} meters`;
      const ans4 = `${(u * u) / 10} meters`;

      qData.question_plain_title = qData.question_plain_title.replace('{u}', String(u));
      qData.ans1_plain_text = ans1;
      qData.ans2_plain_text = ans2;
      qData.ans3_plain_text = ans3;
      qData.ans4_plain_text = ans4;

      if (qData.explanation) {
        qData.explanation = qData.explanation
          .replace('{u}', String(u))
          .replace('{height}', String(height));
      }
    }
    else if (type === 'stokes_law') {
      const r = Math.floor(Math.random() * 4) + 1; // 1 to 4 mm
      const v = Math.floor(Math.random() * 5) + 2; // 2 to 6 m/s
      const r_meters = r * 0.001;
      const force = 6 * 3.14159 * 0.1 * r_meters * v;
      const forceStr = force.toFixed(5);

      const ans1 = `${forceStr} N`;
      const ans2 = `${(force * 2).toFixed(5)} N`;
      const ans3 = `${(force / 2).toFixed(5)} N`;
      const ans4 = `${(6 * 3.14159 * r * v).toFixed(5)} N`;

      qData.question_plain_title = qData.question_plain_title
        .replace('{r}', String(r))
        .replace('{v}', String(v));

      qData.ans1_plain_text = ans1;
      qData.ans2_plain_text = ans2;
      qData.ans3_plain_text = ans3;
      qData.ans4_plain_text = ans4;

      if (qData.explanation) {
        qData.explanation = qData.explanation
          .replace('{r}', String(r))
          .replace('{r_meters}', String(r_meters))
          .replace('{v}', String(v))
          .replace('{force}', forceStr);
      }
    }
    else if (type === 'capacitance_dielectric') {
      const A = Math.floor(Math.random() * 7) + 2; // 2 to 8 m2
      const d = Math.floor(Math.random() * 3) + 1; // 1 to 3 mm
      const K = Math.floor(Math.random() * 5) + 2; // 2 to 6
      const capacitance = (K * 8.85 * A) / d;
      const capStr = capacitance.toFixed(1);

      const ans1 = `${capStr} pF`;
      const ans2 = `${(capacitance * 2).toFixed(1)} pF`;
      const ans3 = `${(capacitance / K).toFixed(1)} pF`;
      const ans4 = `${(8.85 * A / d).toFixed(1)} pF`;

      qData.question_plain_title = qData.question_plain_title
        .replace('{A}', String(A))
        .replace('{d}', String(d))
        .replace('{K}', String(K));

      qData.ans1_plain_text = ans1;
      qData.ans2_plain_text = ans2;
      qData.ans3_plain_text = ans3;
      qData.ans4_plain_text = ans4;

      if (qData.explanation) {
        qData.explanation = qData.explanation
          .replace('{A}', String(A))
          .replace('{d}', String(d))
          .replace('{K}', String(K))
          .replace('{capacitance}', capStr);
      }
    }
    else if (type === 'doppler_approaching') {
      const f = Math.floor(Math.random() * 4) * 50 + 400; // 400, 450, 500, 550 Hz
      const vs = Math.floor(Math.random() * 3) * 10 + 20; // 20, 30, 40 m/s
      const f_prime = Math.round(f * (340 / (340 - vs)));

      const ans1 = `${f_prime} Hz`;
      const ans2 = `${f} Hz`;
      const ans3 = `${Math.round(f * ((340 - vs) / 340))} Hz`;
      const ans4 = `${f_prime + 50} Hz`;

      qData.question_plain_title = qData.question_plain_title
        .replace('{f}', String(f))
        .replace('{vs}', String(vs));

      qData.ans1_plain_text = ans1;
      qData.ans2_plain_text = ans2;
      qData.ans3_plain_text = ans3;
      qData.ans4_plain_text = ans4;

      if (qData.explanation) {
        qData.explanation = qData.explanation
          .replace('{f}', String(f))
          .replace('{vs}', String(vs))
          .replace('{f_prime}', String(f_prime));
      }
    }
    else if (type === 'radius_of_gyration_cylinder') {
      const R = (Math.floor(Math.random() * 7) + 2) * 2; // 4, 6, 8, 10, 12, 14, 16 cm
      const k = (R / 1.4142).toFixed(2);

      const ans1 = `${k} cm`;
      const ans2 = `${R} cm`;
      const ans3 = `${(R / 2).toFixed(2)} cm`;
      const ans4 = `${(R * 0.707).toFixed(2)} cm`; // wait, R*0.707 is R/sqrt(2), so let's make it different
      const ans4_val = (R * 0.577).toFixed(2); // R/sqrt(3) for rod

      qData.question_plain_title = qData.question_plain_title.replace('{R}', String(R));
      qData.ans1_plain_text = ans1;
      qData.ans2_plain_text = ans2;
      qData.ans3_plain_text = ans3;
      qData.ans4_plain_text = `${ans4_val} cm`;

      if (qData.explanation) {
        qData.explanation = qData.explanation
          .replace('{R}', String(R))
          .replace('{k}', String(k));
      }
    }
    else if (type === 'fringe_width_interference') {
      const d = (Math.floor(Math.random() * 4) + 2) * 0.1; // 0.2, 0.3, 0.4, 0.5 mm
      const D = (Math.floor(Math.random() * 3) + 1) * 0.5 + 0.5; // 1.0, 1.5, 2.0 m
      const w = Math.floor(Math.random() * 3) * 50 + 500; // 500, 550, 600 nm
      const beta = (w * 1e-6 * D) / d; // beta in mm
      const betaStr = beta.toFixed(3);

      const ans1 = `${betaStr} mm`;
      const ans2 = `${(beta * 2).toFixed(3)} mm`;
      const ans3 = `${(beta / 2).toFixed(3)} mm`;
      const ans4 = `${(beta * d).toFixed(3)} mm`;

      qData.question_plain_title = qData.question_plain_title
        .replace('{d}', String(d))
        .replace('{D}', String(D))
        .replace('{w}', String(w));

      qData.ans1_plain_text = ans1;
      qData.ans2_plain_text = ans2;
      qData.ans3_plain_text = ans3;
      qData.ans4_plain_text = ans4;

      if (qData.explanation) {
        qData.explanation = qData.explanation
          .replace('{d}', String(d))
          .replace('{D}', String(D))
          .replace('{w}', String(w))
          .replace('{beta}', betaStr);
      }
    }
    else if (type === 'deuterium') {
      qData.ans1_plain_text = '1';
      qData.ans2_plain_text = '2';
      qData.ans3_plain_text = '0';
      qData.ans4_plain_text = '3';
    }
    else if (type === 'gas_temp') {
      const t = Math.floor(Math.random() * 80) + 10;
      const t_kelvin = 2 * (t + 273);

      const ans1 = `${t_kelvin} K`;
      const ans2 = `${t + 273} K`;
      const ans3 = `${2 * t} K`;
      const ans4 = `${t_kelvin - 273} K`;

      qData.question_plain_title = qData.question_plain_title.replace('{t}', String(t));
      qData.ans1_plain_text = ans1;
      qData.ans2_plain_text = ans2;
      qData.ans3_plain_text = ans3;
      qData.ans4_plain_text = ans4;

      if (qData.explanation) {
        qData.explanation = qData.explanation
          .replace('{t}', String(t))
          .replace('{t_kelvin}', String(t_kelvin));
      }
    }
    else if (type === 'organic_dehydration') {
      const alcohols = ['Ethanol', 'Propan-1-ol', 'Butan-1-ol'];
      const alkenes = ['Ethene', 'Propene', 'But-1-ene'];
      const index = Math.floor(Math.random() * alcohols.length);
      const alc = alcohols[index];
      const alk = alkenes[index];

      const ans1 = alk;
      const ans2 = `${alc} Ether`;
      const ans3 = 'Ethane';
      const ans4 = 'Acetate';

      qData.question_plain_title = qData.question_plain_title.replace('{alcohol}', alc);
      qData.ans1_plain_text = ans1;
      qData.ans2_plain_text = ans2;
      qData.ans3_plain_text = ans3;
      qData.ans4_plain_text = ans4;

      if (qData.explanation) {
        qData.explanation = qData.explanation
          .replace('{alcohol}', alc)
          .replace('{alkene}', alk);
      }
    }
    else if (type === 'grignard_alcohol') {
      const grignards = ['Methyl magnesium bromide', 'Ethyl magnesium bromide'];
      const products = ['Ethanol', 'Propan-1-ol'];
      const index = Math.floor(Math.random() * grignards.length);
      const grignard = grignards[index];
      const prod = products[index];

      const ans1 = `${prod} (Primary alcohol)`;
      const ans2 = '2-Propanol (Secondary alcohol)';
      const ans3 = 'Methanol';
      const ans4 = 'Dimethyl ether';

      qData.question_plain_title = qData.question_plain_title.replace('{reagent}', grignard);
      qData.ans1_plain_text = ans1;
      qData.ans2_plain_text = ans2;
      qData.ans3_plain_text = ans3;
      qData.ans4_plain_text = ans4;

      if (qData.explanation) {
        qData.explanation = qData.explanation
          .replace('{reagent}', grignard)
          .replace('{product}', prod);
      }
    }
    else if (type === 'english_verb_concord') {
      const plural = Math.random() > 0.5;
      const noun = plural ? 'teachers' : 'teacher';
      const verb = plural ? 'were' : 'was';
      const wrongVerb = plural ? 'was' : 'were';

      const ans1 = verb;
      const ans2 = wrongVerb;
      const ans3 = 'are';
      const ans4 = 'is';

      qData.question_plain_title = qData.question_plain_title.replace('{subject}', noun);
      qData.ans1_plain_text = ans1;
      qData.ans2_plain_text = ans2;
      qData.ans3_plain_text = ans3;
      qData.ans4_plain_text = ans4;

      if (qData.explanation) {
        qData.explanation = qData.explanation
          .replace('{subject}', noun)
          .replace('{verb}', verb);
      }
    }
  }
}
